import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 as uuidV4 } from "uuid"
import { document } from "src/utils/dynamodbClient";

interface ICreateTodo {
    title: string
    deadline: Date
}

export const handler: APIGatewayProxyHandler = async (event) => {
    const { user_id } = event.pathParameters
    const { title, deadline } = JSON.parse(event.body) as ICreateTodo

    await document.put({
        TableName: "todos",
        Item: {
            id: uuidV4(),
            user_id,
            title,
            done: false,
            deadline
        }
    }).promise()

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "Tarefa criada com sucesso!"
        })
    }
}