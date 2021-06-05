import {document } from '../../utils/dynamodbClient';
import { v4 as uuidV4 } from 'uuid';
import { APIGatewayProxyHandler } from "aws-lambda";

export const handle: APIGatewayProxyHandler = async (event) => {

    const { title, deadline } = JSON.parse(event.body);
    const { user_id } = event.pathParameters;

    const todoId = uuidV4();

    await document.put({
        TableName: 'users_todos',
        Item: {
            id: todoId,         
            user_id,
            title,
            done: false,
            deadline: new Date(deadline)

        }
    }).promise();

    return { 
        statusCode: 200,
        body: JSON.stringify({
            message: "created successfully!",
            todo: {
                id: todoId,
                user_id,
                title,
                done: false,
                deadline
            }
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }
}