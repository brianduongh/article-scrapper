$(document).ready(() => {
  $(document).on('click', '.save-comment', function(event) {
    event.preventDefault();
    const articleId = $(this).data('id');
    const articleComment = $("[data-input='" + articleId + "']").val()
    $.ajax({
      method: 'POST',
      url: '/articles/' + articleId,
      data: {
        body: articleComment
      }
    })
    .then(function(data) {
      console.log(data);
      $("[data-comment='" + articleId + "']").text(articleComment);
      $("[data-input='" + articleId + "']").val('');
    })
  });

  $('#scrape-btn').on('click', function() {
    $.ajax({
      method: 'GET',
      url: '/scrape'
    })
    .then(function() {
      location.reload();
    })
  });
});
