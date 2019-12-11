'use strict'

const AWS = require('aws-sdk')
const uuid = require('uuid')

const docClient = new AWS.DynamoDB.DocumentClient()

const groupsTable = process.env.GROUPS_TABLE

exports.handler = async (event) => {

  const itemId = uuid.v4()

  const parseBody = JSON.parse(event.body)

  const item = {
    id: itemId,
    ...parseBody
  }

 const result = await docClient.put({
    TableName:groupsTable,
    Item: item
  }).promise()

if(result.error){
  throw error
}

  // Return result
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(item)
  }
}

