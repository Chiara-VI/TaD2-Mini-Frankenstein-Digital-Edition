// Declare variables for getting the xml file for the XSL transformation (folio_xml) and to load the image in IIIF on the page in question (number).
let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let extension = ".xml";
let folio_xml = tei_xml.concat(extension);
let page = document.getElementById("page");
let pageN = page.innerHTML;
let number = Number(pageN);

// Loading the IIIF manifest
var mirador = Mirador.viewer({
  "id": "my-mirador",
  "manifests": {
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
      provider: "Bodleian Library, University of Oxford"
    }
  },
  "window": {
    allowClose: false,
    allowWindowSideBar: true,
    allowTopMenuButton: false,
    allowMaximize: false,
    hideWindowTitle: true,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      annotations: false,
      search: false,
      layers: false,
    }
  },
  "workspaceControlPanel": {
    enabled: false,
  },
  "windows": [
    {
      loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
      canvasIndex: number,
      thumbnailNavigationPosition: 'off'
    }
  ]
});


// function to transform the text encoded in TEI with the xsl stylesheet "Frankenstein_text.xsl", this will apply the templates and output the text in the html <div id="text">
function documentLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("Frankenstein_text.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }
  
// function to transform the metadate encoded in teiHeader with the xsl stylesheet "Frankenstein_meta.xsl", this will apply the templates and output the text in the html <div id="stats">
  function statsLoader() {

    Promise.all([
      fetch(folio_xml).then(response => response.text()),
      fetch("Frankenstein_meta.xsl").then(response => response.text())
    ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("stats");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
  }

  // Initial document load
  documentLoader();
  statsLoader();
  // Event listener for sel1 change
  function selectHand(event) {
  var visible_mary = document.getElementsByClassName('#MWS');
  var visible_percy = document.getElementsByClassName('#PBS');
  // Convert the HTMLCollection to an array for forEach compatibility
  var MaryArray = Array.from(visible_mary);
  var PercyArray = Array.from(visible_percy);
    if (event.target.value == 'both') {
    MaryArray.forEach(function (element) {
      element.style.color = 'black';
      element.style.display = 'inline';
    });
    PercyArray.forEach(function (element) {
      element.style.color = 'black';
      element.style.display = 'inline';
    });
    } else if (event.target.value == 'Mary') {
     MaryArray.forEach(function (element) {
      element.style.color = 'blue';
      element.style.display = 'inline';
      });
       PercyArray.forEach(function (element) {
      element.style.color = 'black'; 
      element.style.display = 'inline';
      });
    } else {
    PercyArray.forEach(function (element) {
      element.style.color = 'red';
      element.style.display = 'inline';
      });
    MaryArray.forEach(function (element) {
      element.style.color = 'black'; 
      element.style.display = 'inline';
    });
  }
}

function toggleDeletions() {
  var deletions = document.querySelectorAll('del');

  deletions.forEach(function (element) {
    if (element.style.display === 'none') {
      element.style.display = 'inline';
    } else {
      element.style.display = 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById("toggle-deletions");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleDeletions);
    console.log("Event listener added to toggle deletions button");
  } else {
    console.error("Button with id 'toggle-deletions' not found.");
  }
});

let isReadingTextDisplayed = false;

function displayReadingText() {
  var deletions = document.querySelectorAll('del');
  var additions = document.querySelectorAll('[class="supraAdd"]');

  if (!isReadingTextDisplayed) {
    deletions.forEach(function (element) {
      element.style.display = 'none';
    });

    additions.forEach(function (element) {
      element.classList.remove('supraAdd');
      element.style.display = 'inline';
    });

    isReadingTextDisplayed = true;
  } else {
    deletions.forEach(function (element) {
      element.style.display = 'inline';
    });

    additions.forEach(function (element) {
      element.classList.add('supraAdd');
      element.style.display = '';
    });

    isReadingTextDisplayed = false;
  }
  console.log("Toggled reading text display. Current state:", isReadingTextDisplayed);
}

document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById("toggle-deletions");
  if (toggleButton) {
    toggleButton.addEventListener("click", toggleDeletions);
  }

  const readingButton = document.getElementById("display-reading");
  if (readingButton) {
    readingButton.addEventListener("click", displayReadingText);
  }
});