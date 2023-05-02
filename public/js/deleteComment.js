const deleteCommentButton = document.getElementById("delete-comment-button")

const deleteCommentHandler = async () => {
    const commentId = deleteCommentButton.getAttribute("data-commentid")
    console.log("comment id: " + commentId)

    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
    })
    if (response.ok) {
        document.location.reload()
    } else {
        alert('Failed to delete comment');
    }
}

deleteCommentButton.addEventListener("click", deleteCommentHandler)