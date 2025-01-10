# LANGCHAIN_TRACING_V2=True
# LANGCHAIN_ENDPOINT="https://api.smith.langchain.com"
# LANGCHAIN_API_KEY="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"
# LANGCHAIN_PROJECT="RAG"

#export OPENAI_API_KEY="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"

import getpass
import os

os.environ["OPENAI_API_KEY"] = "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"
if not os.environ.get("OPENAI_API_KEY"):
  os.environ["OPENAI_API_KEY"] = getpass.getpass("Enter API key for OpenAI: ")

from langchain_openai import ChatOpenAI
from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import OpenAIEmbeddings

llm = ChatOpenAI(model="gpt-4o-mini")
embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
vector_store = InMemoryVectorStore(embeddings)

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from langchain import hub
from langchain_community.document_loaders import WebBaseLoader
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langgraph.graph import START, StateGraph
from typing_extensions import List, TypedDict
import bs4

# FastAPI app setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with specific origins for production, e.g., ["https://your-firebase-app.web.app"]
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)
# Input data structure
class QuestionRequest(BaseModel):
    question: str

# Define state for application
class State(TypedDict):
    question: str
    context: List[Document]
    answer: str

# Initialize components
loader = WebBaseLoader(
    web_paths=("https://lilianweng.github.io/posts/2023-06-23-agent/",),
    bs_kwargs=dict(
        parse_only=bs4.SoupStrainer(
            class_=("post-content", "post-title", "post-header")
        )
    ),
)
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
all_splits = text_splitter.split_documents(docs)

from langchain_core.vectorstores import InMemoryVectorStore
from langchain_openai import ChatOpenAI, OpenAIEmbeddings

# Initialize vector store and LLM
vector_store = InMemoryVectorStore(OpenAIEmbeddings(model="text-embedding-3-large"))
_ = vector_store.add_documents(documents=all_splits)
llm = ChatOpenAI(model="gpt-4o-mini")

# Define prompt for question-answering
prompt = hub.pull("rlm/rag-prompt")

# Define application steps
def retrieve(state: State):
    retrieved_docs = vector_store.similarity_search(state["question"])
    print(f"Retrieved Documents: {retrieved_docs}")
    return {"context": retrieved_docs}

def generate(state: State):
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    print(f"Context Passed to LLM: {docs_content}")  # Debugging
    messages = prompt.invoke({"question": state["question"], "context": docs_content})
    response = llm.invoke(messages)
    print(f"LLM Response: {response.content}") # for debug
    return {"answer": response.content}

# Compile state graph
graph_builder = StateGraph(State).add_sequence([retrieve, generate])
graph_builder.add_edge(START, "retrieve")
graph = graph_builder.compile()

# API Endpoint
@app.post("/ask")
async def ask_question(request: QuestionRequest):
    try:
        state = {"question": request.question}
        response = graph.invoke(state)
        return {"answer": response["answer"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
