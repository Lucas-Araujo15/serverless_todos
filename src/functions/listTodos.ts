import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
    const { user_id } = event.pathParameters

    const response = await document.query({
        TableName: "todos",
        IndexName: "User",
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": user_id
        }
    }).promise()

    if (response.Items.length > 0) {
        return {
            statusCode: 200,
            body: JSON.stringify(response.Items)
        }
    }

    return {
        statusCode: 404,
        body: JSON.stringify({
            message: "Nenhuma tarefa foi encontrada!"
        })
    }
}