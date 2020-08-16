import threading
import time

from core import strings

TIMEOUT = 60
THREAD_NAMES = ["process video", "upload video"]


def process_video():
    """
    This function converts the video to HLS format and generates the thumbnail.
    """
    from core.models import Video

    while True:
        while Video.objects.filter(status=strings.Constants.NEW).exists():
            for video in Video.objects.filter(status=strings.Constants.NEW):
                video.is_processing()
                video.update_video_duration()
                video.generate_thumbnails()
                video.convert_to_hls()
                video.is_uploading()

        time.sleep(TIMEOUT)


def upload_video():
    """
    This function uploads the video and thumbnails to Google Cloud. Afterwards, the files are deleted.
    """
    from core.models import Video

    while True:
        while Video.objects.filter(status=strings.Constants.UPLOADING).exists():
            for video in Video.objects.filter(status=strings.Constants.UPLOADING):
                video.upload_hls_video()
                video.upload_thumbnails()
                video.delete_temp_files()
                video.is_ready()

        time.sleep(TIMEOUT)


def run():
    """
    This function ensures that only one instance of each thread is running at any time.
    """
    is_thread_alive = False
    for thread in threading.enumerate():
        if thread.name == THREAD_NAMES[0]:
            is_thread_alive = True
            break

    if is_thread_alive is False:
        thread = threading.Thread(target=process_video)
        thread.name = THREAD_NAMES[0]
        thread.start()

        thread = threading.Thread(target=upload_video)
        thread.name = THREAD_NAMES[1]
        thread.start()