const getRawBody = require('raw-body')
const axios = require('axios')

module.exports.gitee = function(request, response, context) {
  // get request body
  getRawBody(request, async function(err, body) {

    if (!request.headers['user-agent'] || request.headers['user-agent'] !== 'git-oschina-hook') {
      response.setStatusCode(500)
      response.setHeader('content-type', 'application/json')
      response.send(JSON.stringify({
        message: '非法的请求'
      }, null, 4))  
    }

    const realBody = body.toString('utf8');
    const parsedBody = JSON.parse(realBody);

    const hookNames = {
        'push_hooks': 'commit(s) pushed',
        'issue_hooks': 'issues issued',
        'merge_request_hooks': 'merge request',
        'note_hooks': 'note(s) noted'
    }

    const title = `Gitee 新动态`
    let branch = parsedBody.ref.split('/')
    branch = branch[branch.length - 1]
    let commits = ''
    for (let i = 0; i < parsedBody.commits.length; i++) {
    const url = parsedBody.commits[i].url;
    commits += `<a href="${url}">${parsedBody.commits[i].id.substring(0, 6)}</a>: ${parsedBody.commits[i].message} - ${parsedBody.commits[i].author.username}`
    }
    const text = `[<a href="${parsedBody.repository.url}">${parsedBody.repository.full_name}</a>]: new ${hookNames[parsedBody.hook_name]} to ${branch} by <a href="${parsedBody.head_commit.author.url}">${parsedBody.head_commit.author.username}</a>: 
${commits}`

    const result =  await axios.post('https://open.feishu.cn/open-apis/bot/hook/899cad328dc74528bfa87388f59331c6', {
    title,
    text,
    });

    const respBody = {
    // request,
    parsedBody,
    text
    // text,
    // result
    // result
    }

    response.setStatusCode(200)
    response.setHeader('content-type', 'application/json')
    response.send(JSON.stringify(respBody, null, 4))

  })
}