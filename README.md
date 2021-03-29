# YouTube-Lite

Embed lazy-loaded YouTube videos and playlists and uses the no-cookie version of YouTube for privacy.

By [@craigbuckler](https://twitter.com/craigbuckler) but there are lots of alternatives that gave me inspiration.


## Usage

Load the script anywhere in your HTML page as an ES6 module (2.2Kb):

```html
<script type="module" src="./dist/youtube-lite.min.js"></script>
```

or using a CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/youtube-lite/dist/youtube-lite.min.js"></script>
```

Add single video elements to the page using their YouTube ID:

```html
<youtube-lite
  video="wbuBs7b6RDQ"
></youtube-lite>
```

The standard placeholder will be used but a custom image can be defined:

```html
<youtube-lite
  video="wbuBs7b6RDQ"
  placeholder="./video.png"
></youtube-lite>
```

Add playlist video elements to the page using their YouTube ID. Note that a placeholder image must be set manually:

```html
<youtube-lite
  playlist="PLjpnFshmVzHZV_H5GslyUrV4Kr8R2hsxl"
  placeholder="https://i.ytimg.com/vi/Z3l8Iec4dBk/hqdefault.jpg"
></youtube-lite>
```

Use [custom YouTube parameters](https://developers.google.com/youtube/player_parameters#Parameters):

```html
<youtube-lite
  video="wbuBs7b6RDQ"
  params="start=10&end=30&controls=0"
></youtube-lite>
```


## CSS styling

The elements can be styled like any other element, e.g.

```css
youtube-lite {
  display: block;
  width: 100%;
  max-width: 50em;
  margin: 1em auto;
}
```


## JavaScript interactivity

The element's attributes can be changed at any time using JavaScript to update the current video, e.g.

```js
// get first <youtube-lite> element
const player = document.querySelector('youtube-lite');

// change video
player.setAttribute('video', 'hKsxtmS8WIc');
```


## Version history

**1.0.0**: 29 March 2021

* initial release.
