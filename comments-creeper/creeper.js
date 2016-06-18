const commentsCreeper = {
  escapeHtml: function(string) {
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
  },


  commentNode: function(content) {
    return `<div class="commentspy-commentNode">${this.escapeHtml(content)}</div>`
  },

  comments: function() {
    return $(document).find('*').
    map(function() {
      try {
        return $(this).contents().
          filter(function() {
            return this.nodeType === 8
          }).
          map(function() {
            return this.nodeValue
          }).
          toArray()
      } catch(err) {
        console.warn(`commentsCreeper error: ${err}`)
      }
    }).
    toArray()
  }(),

  documentComments: function() {
    return [...document.childNodes].
    filter(function(node) {
      return node.nodeType === 8
    }).
    map(function(node) {
      return node.nodeValue
    })
  }(),

  buildComments: function() {
    const nodes = [...this.comments, ...this.documentComments]
    nodes.map(function(comment) {
      $('body').prepend(this.commentNode(comment))
    }.bind(this))
  },
}

commentsCreeper.buildComments()

