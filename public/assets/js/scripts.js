
if (!window.fmbs) {
  window.fmbs = {};
}



function getMarkupWithData (artistName, artistData)   {
  console.log(`getting markup with metadata for: ${artistName}`);
  const tokenAddress =  artistData.artworks[0].token_address;
  const metadata = artistData.artworks[0].metadata;
  // const links =  artistData[artistName].links[];
  const name = metadata.name;
  const description = metadata.description;
  const imageUrl = metadata.image;
  console.log(`imageUrl: ${imageUrl}`);
  // const animationUrl = metadata.animation_url;
  // const attributes = metadata.attributes;

  return window.fmbs.galleryMarkup = `<div class="fmbs-gallery-grid-item">
        <img class="fmbs-gallery-grid-item__img" src=${imageUrl}/>
        <h4 class="fmbs-gallery-grid-item__text">${name}</h4>
        <p class="fmbs-gallery-grid-item__description">${description}</p>
        <a class="fmbs-gallery-grid-item__more-link" href="javascript://">[more about the item]</a>
    </div>`;
}

// window.fmbs.galleryMarkup = `<div class="fmbs-gallery-grid-item">
//         <img class="fmbs-gallery-grid-item__img" src="https://i.imgur.com/eL5JPhi.jpg"/>
//         <h4 class="fmbs-gallery-grid-item__text">Edition #001  100thousand  KirbLaGoop Plush</h4>
//         <p class="fmbs-gallery-grid-item__description">EDITION 001 of 100 Physical 100 Thousand Kirblagoop Plush <br>100 Thousand Plush Collaboration Flexicoworldwide Marcy Mane and Kirblagoop 100 Thousand. Plush Created based off design by Aidan Capristo. <br><br>Physical Plush 12 Inch<br>with MP3 Playable Sounds</p>
//         <a class="fmbs-gallery-grid-item__more-link" href="javascript://">[more about the item]</a>
//     </div>`;

 async function fetchArtistData(artistName) {
  console.log(`fetching data for: ${artistName}`);
  const data = await fetch(`/api/v1/data/artist/${artistName}`)
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error));

    console.log(`DATA:::: ${JSON.stringify(data[artistName])}`);
  console.log(`address: ${data[artistName].address} \n`);
  console.log(`links: ${JSON.stringify(data[artistName].links)}\n`);
  console.log(`artworks: ${JSON.stringify(data[artistName].artworks)}\n`);
  if(data) {

    return data[artistName];
  }
}

async function initGallery(artistName) {
  const artistData = await fetchArtistData(artistName);

  const galleryContainer = document.querySelector(".fmbs-gallery-grid");

  if (galleryContainer) {
    let galleryContents = "";


    for (let i = 0; i < artistData.artworks.length; i++) {
      // galleryContents += window.fmbs.galleryMarkup;
      galleryContents += getMarkupWithData(artistName, artistData);
    }

    // for (let i = 0; i < 9; i++) {
    //   galleryContents += window.fmbs.galleryMarkup;
    // }

    galleryContainer.classList.remove("fmbs-gallery--loading");

    galleryContainer.innerHTML = galleryContents;
  }
}

 initGallery('afuturemodern');

// fetch an artist's data and log details.
// artistData = fetchArtistData("afuturemodern");

