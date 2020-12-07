# GraphQL-Node.Js-Express.js
GraphQL Node.Js Express.js

#Fetch All books
{
    books{
      id
      author {
        name
      }
      
    }
}
#Fetch All Authors with books
{
    authors{
      id
      name
      books{
        id
        name
        authorId
      }
    }
}
#Fetch Single Book
{
    book(id:1){
      name
      author{
        name
      }
    }
}
#Add Book
mutation{
    addBook(name: "String",authorId: 1) {
      id
    }
}
