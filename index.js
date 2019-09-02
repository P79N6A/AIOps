const getRawBody = require('raw-body')
const axios = require('axios')

module.exports.tower = function(request, response, context) {
  // get request body
  getRawBody(request, async function(err, body) {

    if (!request.headers['user-agent'] || request.headers['user-agent'] !== 'Tower-Hookshot') {
      response.setStatusCode(500)
      response.setHeader('content-type', 'application/json')
      response.send(JSON.stringify({
        message: '非法的请求'
      }, null, 4))  
    }

    const realBody = body.toString('utf8');

    try {

      const parsedBody = JSON.parse(realBody);

      const action = ['created', 'deleted', 'archived', 'unarchived', 'updated'];
      const actionInCN = ['创建', '删除', '归档', '撤销归档', '更新'];

      const text = `[<a href="https://tower.im/projects/${parsedBody.data.project.guid}">${parsedBody.data.project.name}</a>] ${parsedBody.data.todolist.handler.nickname} ${actionInCN[action.indexOf(parsedBody.action)]} 了任务 ${parsedBody.data.todolist.name}`

      const result =  await axios.post('https://open.feishu.cn/open-apis/bot/hook/751182e164d044eb8c2a9efeaef5227e', {
        title: '新任务来啦',
        text,
      });

      // const respBody = {
      //   request,
      //   parsedBody,
      //   text,
      //   result
      // }
  
      response.setStatusCode(200)
      response.setHeader('content-type', 'application/json')
      response.send(JSON.stringify(result, null, 4))
  
    }catch(message) {
      response.setStatusCode(500)
      response.setHeader('content-type', 'application/json')
      response.send(JSON.stringify({
        message
      }, null, 4))
    }
  })
}
