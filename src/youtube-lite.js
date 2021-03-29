/*
<youtube-lite> web component

load script:
<script type="module" src="./dist/youtube-lite.min.js"></script>

Create a <youtube-lite> element. Attributes:

  - video="<single-video-code>" or
  - playlist="<playlist-code>"
  - placeholder="<thumbnail-url>" (optional)
  - params="<YouTube-params>" (optional)
*/

// compressed string - obtain by running
// node ./src/youtube-lite-html.js
const html = `<style>div{position:relative;width:100%;height:0;padding:56.25% 0 0 0;margin:0;background:center / cover no-repeat #000;cursor:pointer}div.play::after{content:'';background:center / 68px 48px no-repeat url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 48"><path fill="%23f00" fill-opacity=".8" d="M66.5 7.7c-.8-2.9-2.5-5.4-5.4-6.2C55.8.1 34 0 34 0S12.2.1 6.9 1.6c-3 .7-4.6 3.2-5.4 6.1a89.6 89.6 0 000 32.5c.8 3 2.5 5.5 5.4 6.3C12.2 47.9 34 48 34 48s21.8-.1 27.1-1.6c3-.7 4.6-3.2 5.4-6.1C68 35 68 24 68 24s0-11-1.5-16.3z"/><path fill="%23fff" d="M45 24L27 14v20"/></svg>');filter:grayscale(100%)}div.play:hover::after{filter:none}div.play::after,iframe{position:absolute;top:0;left:0;width:100%;height:100%;padding:0;margin:0;border:0}</style><div class="play"></div>`;

class YouTubeLite extends HTMLElement {

  constructor() {
    super();
  }

  // component attributes
  static get observedAttributes() {
    return ['video', 'playlist', 'placeholder', 'params'];
  }

  // attribute change
  attributeChangedCallback(property, oldValue, newValue) {

    if (oldValue === newValue) return;
    this[property] = newValue;

    let url = 'https://www.youtube-nocookie.com/embed/';

    switch (property) {

      // video defined
      case 'video':
        this.video = encodeURIComponent(this.video);
        this.url = url + this.video + '?';
        this.placeholder = `https://i.ytimg.com/vi/${ this.video }/hqdefault.jpg`;
        this.loadPlaceholder();
        this.loadVideo();
        break;

      // playlist defined
      case 'playlist':
        this.url = url + 'videoseries?list=' + encodeURIComponent(this.playlist) + '&';
        this.loadVideo();
        break;

      // placeholder defined
      case 'placeholder':
        this.loadPlaceholder();
        break;

    }

  }

  // initialise
  connectedCallback() {

    // create shadow DOM
    const root = this.attachShadow({ mode: 'closed' });
    root.innerHTML = html;
    this.container = root.querySelector('div');

    // show placeholder
    this.loadPlaceholder();

    // click event
    this.addEventListener('click', e => this.loadVideo(e), { once: true });

  }


  // load placeholder
  loadPlaceholder() {

    if (this.placeholder && this.container && !this.iframe) {
      this.container.style.backgroundImage = `url(${ this.placeholder })`;
    }

  }


  // load YouTube video
  loadVideo(e) {

    // do not play if switching unplayed video
    if (!e && !this.iframe) return;

    // remove existing video
    if (this.iframe) {
      this.iframe.remove();
    }

    const
      params = new URLSearchParams(this.params || []),
      iframe = document.createElement('iframe');

    params.append('autoplay', '1');

    iframe.width = 560;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.src = this.url + params.toString();
    this.container.className = '';
    this.iframe = this.container.appendChild(iframe);
    this.iframe.focus();

  }

}

// register component
window.customElements.define('youtube-lite', YouTubeLite);
