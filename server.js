const express = require('express')
const {graphqlHTTP} = require('express-graphql')
const {GraphQLSchema,GraphQLObjectType,GraphQLString,GraphQLList,GraphQLInt,GraphQLNonNull} = require('graphql')

const app = express()
const port = 5000

const authors = [
    {id:1, name:"Atiq"},
    {id:2, name:"Ahsan"},
    {id:3, name:"Arif"},
]

const books = [
    {id:1, name:"learn java",authorId:1},
    {id:2, name:"learn php",authorId:1},
    {id:3, name:"learn html",authorId:3},
    {id:4, name:"learn react",authorId:3},
    {id:5, name:"learn redux",authorId:2},
    {id:6, name:"learn python",authorId:2},
    {id:7, name:"learn css",authorId:2},
    {id:8, name:"learn node.js",authorId:2},
    {id:9, name:"learn python",authorId:1},
    {id:10, name:"learn jsp",authorId:1},
    {id:11, name:"learn servlets",authorId:1},
]

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "represent author",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                return books.filter(book => book.authorId === author.id)
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "represent Book",
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)},
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id === book.authorId)
            }
        }

    })
})

const RootQueryType = new GraphQLObjectType({
    name: "Query",
    description: "Root Query",
    fields: () => ({
        books: {
            type: new GraphQLList(BookType),
            description: "list all boss",
            resolve: () => books
        },
        book: {
            type: BookType,
            description: "Find Single Book",
            args:{
                id: {type:GraphQLInt}
            },
            resolve: (parent,args) => books.find(book => book.id === args.id)
        },
        authors:{
            type:new GraphQLList(AuthorType),
            description: "list all authors",
            resoelve: () => authors
        },
        author: {
            type: AuthorType,
            description: "Single Author",
            args: {
                id: {type:GraphQLInt}
            },
            resolve: (parent,args) => authors.find(author => author.id === args.id)
        }
    })
})

const RootMutationType = new GraphQLObjectType({
    name:'Mutation',
    description: 'insert update delete',
    fields: () => ({
        addBook:{
            type: BookType,
            description: "add book",
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLNonNull(GraphQLInt)},
            },
            resolve: (parent,args) =>{
                const book = {id: books.length +1, name: args.name, authorId: args.authorId}
                books.push(book)
                return book
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType ,
    mutation: RootMutationType
})

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: "HelloWorld",
//         fields: () => ({
//             message: {
//                 type:GraphQLString,
//                 resolve: () => "Hello World"
//             }
//         })
//     })
// })

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}))


app.listen(port, () => { // Step 1 (create server)
  console.log(`Example app listening at http://localhost:${port}`)
})

/*{
    books{
      id
      author {
        name
      }
      
    }
}*/

/*{
    authors{
      id
      name
      books{
        id
        name
        authorId
      }
    }
}*/

/*{
    book(id:1){
      name
      author{
        name
      }
    }
}*/

/*mutation{
    addBook(name: "String",authorId: 1) {
      id
    }
}*/