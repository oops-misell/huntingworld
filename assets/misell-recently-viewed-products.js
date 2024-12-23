/**
 * @file misell-recently-viewed-products.js
 * @brief JavaScript file to manage recently viewed products functionality
 */

theme.RecentlyViewedProducts = (function() {
  /**
   * Class to manage viewing history
   */
  function RecentlyViewedProducts(container) {
    this.container = container;
    if (container) {
      this.init(container);
    }
  }

  RecentlyViewedProducts.prototype = {
    init: function(container) {
      this.sectionId = container.getAttribute('data-section-id');
      this.productsContainer = container.querySelector('[data-recently-viewed-row]');
      this.emptyMessage = container.querySelector('[data-recently-viewed-empty]');
      
      const settings = container.dataset.sectionSettings ? JSON.parse(container.dataset.sectionSettings) : {};
      this.productLimit = parseInt(settings.productsLimit || 6);
      this.productsPerRow = parseInt(settings.grid || 3);
      
      this.loadRecentProducts();
    },

    loadRecentProducts: function() {
      if (!this.productsContainer) return;
      
      const products = this.getRecentProducts();
      
      if (products.length === 0) {
        this.showEmptyMessage();
        if (this.heading) {
          this.heading.style.display = 'none';
        }
        return;
      }

      if (this.heading) {
        this.heading.style.display = 'block';
      }

      this.renderProducts(products);
    },

    getRecentProducts: function() {
      try {
        const products = JSON.parse(localStorage.getItem('recentlyViewedProducts') || '[]');
        return products.slice(0, this.productLimit || 6);
      } catch (e) {
        console.error('Failed to get viewing history:', e);
        return [];
      }
    },

    addProductToHistory: function(product) {
      if (!product || !product.id) return;
      
      try {
        let products = this.getRecentProducts();
        
        // Remove duplicates
        products = products.filter(p => p.id !== product.id);
        
        // Add to beginning
        products.unshift(product);
        
        // Remove products exceeding limit
        if (products.length > 20) {
          products = products.slice(0, 20);
        }

        localStorage.setItem('recentlyViewedProducts', JSON.stringify(products));
        
        // For debugging
        console.log('Added product to history:', product.title);
        console.log('Current history:', products);
      } catch (e) {
        console.error('Failed to add product to history:', e);
      }
    },

    renderProducts: function(products) {
      this.productsContainer.innerHTML = '';
      
      products.forEach(product => {
        const productElement = this.createProductElement(product);
        this.productsContainer.appendChild(productElement);
      });
    },

    createProductElement: function(product) {
      const colClass = `col-6 col-sm-${12/this.productsPerRow}`;
      
      const div = document.createElement('div');
      div.className = colClass;
      
      // Build product card HTML
      div.innerHTML = `
        <div class="product-card mb-30">
          <a href="${product.url}" class="d-block">
            <div class="product-card__image">
              <img src="${product.featured_image}" alt="${product.title}" class="w-100">
            </div>
            <div class="product-card__info text-center">
              <h3 class="product-card__title h6 mb-10">${product.title}</h3>
              <div class="product-card__price">
                ${product.price_html}
              </div>
            </div>
          </a>
        </div>
      `;
      
      return div;
    },

    showEmptyMessage: function() {
      this.productsContainer.innerHTML = '';
      this.emptyMessage.classList.remove('d-none');
    }
  };

  return RecentlyViewedProducts;
})();

// Register section
theme.Sections.register('recently-viewed', theme.RecentlyViewedProducts); 