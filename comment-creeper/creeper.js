const escapeHtml = function(string) {
  if (typeof string !== 'string') {
    console.warn(string)
    throw `string expected, got ${typeof string} instead`
  }
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
  nodes.map(function(comment) {
    $('body').prepend(commentNode(comment))
  })
}

let $comments = $(document).find('*').
  map(function() {
    return $(this).contents().
      filter(function() {
        return this.nodeType === 8
      }).
      map(function() {
        return this.nodeValue
      }).
      toArray()
  }).
  toArray()

let $documentComments = [...document.childNodes].
  filter(function(node) {
    return node.nodeType === 8
  }).
  map(function(node) {
    return node.nodeValue
  })

buildComments([...$comments, ...$documentComments])
