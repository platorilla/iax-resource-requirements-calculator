// Copyright © 2025 ITRS. All rights reserved.

"use strict";

(() => {
  class PTK {
    constructor(url) {
      this.url = url;
      this.go = new window.Go();
    }

    async load() {
      const result = await WebAssembly.instantiateStreaming(
        fetch(this.url),
        this.go.importObject
      );
      this.go.run(result.instance);
    }
  }

  globalThis.ptk = new PTK("./ptk.wasm", true);
})();
