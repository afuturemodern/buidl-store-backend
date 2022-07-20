if (!window.fmbs) {
  window.fmbs = {};
}

window.fmbs.galleryMarkup = `<div class="fmbs-gallery-grid-item">
        <img class="fmbs-gallery-grid-item__img" src="https://i.imgur.com/eL5JPhi.jpg"/>
        <h4 class="fmbs-gallery-grid-item__text">Edition #001  100thousand  KirbLaGoop Plush</h4>
        <p class="fmbs-gallery-grid-item__description">EDITION 001 of 100 Physical 100 Thousand Kirblagoop Plush <br>100 Thousand Plush Collaboration Flexicoworldwide Marcy Mane and Kirblagoop 100 Thousand. Plush Created based off design by Aidan Capristo. <br><br>Physical Plush 12 Inch<br>with MP3 Playable Sounds</p>
        <a class="fmbs-gallery-grid-item__more-link" href="javascript://">[more about the item]</a>
    </div>`;

async function fetchArtistData(artistName) {
  console.log(`fetching data for: ${artistName}`);
  const data = await fetch(`/api/v1/data/artist/${artistName}`)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));

  const links =
    //   console.log(`data: ${JSON.stringify(data[artistName])}`);
    console.log(`address: ${data[artistName].address} \n`);
  console.log(`links: ${JSON.stringify(data[artistName].links)}\n`);
  console.log(`artworks: ${JSON.stringify(data[artistName].artworks)}\n`);

  // const {address, links, artworks} = data[artistName];
  // console.log(`address: ${address}\n, links: ${JSON.stringify(links)} \n, artworks: ${JSON.stringify(artworks)}`);
}

function initGallery() {
  const galleryContainer = document.querySelector(".fmbs-gallery-grid");

  if (galleryContainer) {
    let galleryContents = "";

    for (let i = 0; i < 9; i++) {
      galleryContents += window.fmbs.galleryMarkup;
    }

    galleryContainer.classList.remove("fmbs-gallery--loading");

    galleryContainer.innerHTML = galleryContents;
  }
}

initGallery();
fetchArtistData("afuturemodern");
