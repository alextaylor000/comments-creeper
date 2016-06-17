console.log("Creeping all the comments...")

const escapeHtml = function(string) {
  // thanks - http://bit.ly/1YsJt6b
  const chars = {
     '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
  }
  return string.replace(/[&<>"']/g, function(m) { return chars[m]; });
}


const commentNode = function(content) {
  return `<div class="commentspy-commentNode">${escapeHtml(content)}</div>`
}


const buildComments = function(nodes) {
  nodes.map(function(_, comment) {
    $('body').prepend(commentNode(comment))
  })
}

// TODO: this isn't finding nested comments properly
// $('body').contents() isn't recursive, but find('*') is -
// however, find() doesn't find comments :/
let $comments = $('body').contents().map(
  function() {
    if (this.nodeType === 8) {
      return this.nodeValue
    }
  }
)

console.log(`Found ${$comments.length} comment nodes, building...`)

buildComments($comments)
