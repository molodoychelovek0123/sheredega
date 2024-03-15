export const MAP_INLINE_STYLES = `
      .map-container .mapboxgl-popup.mapboxgl-popup-anchor-bottom {
          /* left: 50%; */
          top: -10px;
          /* margin-left: 2%; */
      }
      
      .map-container  .mapboxgl-ctrl.mapboxgl-ctrl-group {
          display: flex;
          gap: 20px;
          background: transparent;
          box-shadow: none;
          margin: 40px 60px 0 0;
      }
      
     .map-container  button.mapboxgl-ctrl-zoom-in, .map-container button.mapboxgl-ctrl-zoom-out {
          box-sizing: border-box;
          width: 50px;
          height: 50px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.1);
              border-radius: 0px;
      }
      
      .map-container .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-in .mapboxgl-ctrl-icon {
          background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iODkiIHZpZXdCb3g9IjAgMCA5MCA4OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjM1IiB5MT0iNDQiIHgyPSI1NSIgeTI9IjQ0IiBzdHJva2U9IiNCMkIyQjIiIHN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB4MT0iNDUiIHkxPSI1NCIgeDI9IjQ1IiB5Mj0iMzQiIHN0cm9rZT0iI0IyQjJCMiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=");
      }
      
      .map-container .mapboxgl-ctrl button.mapboxgl-ctrl-zoom-out span.mapboxgl-ctrl-icon {
          background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iODkiIHZpZXdCb3g9IjAgMCA5MCA4OSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGxpbmUgeDE9IjM1IiB5MT0iNDQiIHgyPSI1NSIgeTI9IjQ0IiBzdHJva2U9IiNCMkIyQjIiIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4K");
      }
      .map-container .mapboxgl-ctrl-compass{
      display: none;
      }
      
      .mapboxgl-popup-tip {
          z-index: 10;
          top: -1px;
          position: relative;
      }
      .mapboxgl-popup-content {
          box-sizing: border-box;
          padding: 10px 30px 12px;
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 3px;
          
          font-family: 'Grato Grotesk DEMO';
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 120%;
          text-align: center;
          color: #000000;
      }
      
      
      
      button.mapboxgl-popup-close-button {
          scale: 1.6;
          right: 5px;
          top: 1px;
      }
      
      button.mapboxgl-popup-close-button:hover {
          background: transparent;
      }
      .mapboxgl-ctrl-bottom-left, .mapboxgl-ctrl-bottom-right{
      opacity: 0;
      }
      @media (max-width: 900px){
        .map-container  .mapboxgl-ctrl-top-right {
          position: absolute;
          bottom: 40px;
          top: auto;
          margin: 0;
          right: 16px;
        }
         .map-container  .mapboxgl-ctrl-top-right .mapboxgl-ctrl-group{
          margin: 0;
         }
      }
      @media (min-width: 900px){
         .map-container button.mapboxgl-ctrl-zoom-out, .map-container button.mapboxgl-ctrl-zoom-in {
            width: 90px;
            height: 90px;
        }
      }
      `;