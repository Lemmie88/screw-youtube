$(document).ready(function () {

})

function submitForm(page) {
    let form = $('#playlist-form')

    if (page.toString().includes('add')) {
        post(window.location.pathname, addPlaylistCallback, form.serialize())
    }
}

/**
 * This function displays error if there are errors, otherwise, it will redirect to playlists page.
 * @param data Data from API
 */
function addPlaylistCallback(data) {
    if (isStatusOk(data) === false) {
        displayFormErrors(data)
    } else {
        // TODO: Redirect to playlists page.
    }
}

/**
 * This function finds all the checked checkboxes and adds the video IDs into a list which is added into a hidden input.
 */
function addVideoToPlaylist() {
    let videos = $('#video-modal').find('.form-check-input:checked')
    let list = []
    for (let i = 0; i < videos.length; i++) {
        list.push($(videos[i]).attr('id'))
    }
    $('#playlist-form').find('input[name="videos"]').val(list)
}