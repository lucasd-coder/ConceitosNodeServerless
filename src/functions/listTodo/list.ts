import {document } from '../../utils/dynamodbClient';
import { APIGatewayProxyHandler } from "aws-lambda";


export const handle: APIGatewayProxyHandler = async (event) => {

    const { user_id } = event.pathParameters;

    const response = await document.query({
        TableName: 'users_todos',
        KeyConditionExpression: 'user_id= :userid',
        ExpressionAttributeValues: {
            ':user_id': user_id
        }
    }).promise();
    

        return {
            statusCode: 200,
            body: JSON.stringify(response.Items),
            headers: {
                "Content-Type": "application/json"
            }
        }
    
}