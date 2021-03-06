/**
 * This function opens the modal which warns the user.
 */
function clickDelete() {
    modal('Are you sure?', 'This playlist will be deleted permanently.', 'Delete', deletePlaylist)
}

/**
 * This function sends the data to delete the playlist.
 */
function deletePlaylist() {
    let url = replaceUrl('edit', 'delete')
    post(url, redirectToPlaylists)
}

function submitForm() {
    let form = $('#playlist-form')

    if (PAGE === 'add playlist') {
        post(window.location.pathname, addPlaylistCallback, form.serialize())
    }

    if (PAGE === 'edit playlist') {
        // Get sequence of videos.
        let videos = $('.video-list')
        let list = []

        for (let i = 0; i < videos.length; i++) {
            list.push($(videos[i]).data('url'))
        }

        form.find('input[name="videos"]').val(list)
        post(window.location.pathname, editPlaylistCallback, form.serialize())
    }
}

/**
 * This function is called when the user clicks submit in the add playlist page.
 * This function displays error if there are errors, otherwise, it will redirect to playlist page.
 * @param data Data from API
 */
function addPlaylistCallback(data) {
    if (isStatusOk(data) === false) {
        displayFormErrors(data)
    } else {
        redirectToPlaylist(data['url'])
    }
}

/**
 * This function is called when the user clicks submit in the edit playlist page.
 * This function displays error if there are errors, otherwise, it will redirect to playlist page.
 * @param data Data from API
 */
function editPlaylistCallback(data) {
    if (isStatusOk(data) === false) {
        displayFormErrors(data)
    } else {
        redirectToPlaylist(data['url'])
    }
}

/**
 * This function finds all the checked checkboxes and adds the video URLs into a list which is added into a hidden input.
 */
function addVideoToPlaylist() {
    // Find videos that are checked.
    let videos = $('#video-modal').find('.form-check-input:checked')
    let list = []
    for (let i = 0; i < videos.length; i++) {
        list.push($(videos[i]).data('url'))
    }

    let playlistForm = $('#playlist-form')
    playlistForm.find('input[name="videos"]').val(list)

    // In edit playlist page, when user clicks okay in the select modal, the data is sent to the server and the page
    // refreshes.
    if (PAGE === 'edit playlist') {
        let data = {
            'playlist': playlistForm.find('input[name="playlist"]').val(),
            'videos': playlistForm.find('input[name="videos"]').val()
        }
        post('/playlists/add-video/', reloadCallback, data)
    }
}