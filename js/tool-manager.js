/**
 * 工具管理器
 * 负责处理用户添加和删除常用工具的功能
 */

// 初始化时加载所有可用工具
document.addEventListener('DOMContentLoaded', function() {
    // 从本地存储加载之前保存的常用工具
    loadFavoriteTools();
    
    // 为空工具卡添加点击事件
    setupEmptyCardEvents();
    
    // 设置弹窗关闭事件
    setupModalEvents();
});

/**
 * 设置空工具卡的点击事件
 */
function setupEmptyCardEvents() {
    const emptyCards = document.querySelectorAll('.tool-card.empty');
    emptyCards.forEach(card => {
        card.addEventListener('click', function() {
            const position = this.dataset.position;
            openToolSelectionModal(position);
        });
    });
}

/**
 * 设置弹窗的事件处理
 */
function setupModalEvents() {
    const modal = document.getElementById('tool-select-modal');
    const closeButton = document.querySelector('.close-button');
    
    // 点击关闭按钮关闭弹窗
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // 点击弹窗外部关闭弹窗
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

/**
 * 打开工具选择弹窗
 * @param {string} position - 要添加工具的位置
 */
function openToolSelectionModal(position) {
    const modal = document.getElementById('tool-select-modal');
    const modalToolsList = document.getElementById('modal-tools-list');
    
    // 清空之前的内容
    modalToolsList.innerHTML = '';
    
    // 获取所有可用工具
    const allTools = getAllTools();
    
    // 在弹窗中添加工具列表
    allTools.forEach(tool => {
        const toolElement = document.createElement('div');
        toolElement.className = 'tool-card';
        toolElement.dataset.toolId = tool.id;
        
        toolElement.innerHTML = `
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
        `;
        
        // 点击工具时添加到常用工具
        toolElement.addEventListener('click', function() {
            addToolToFavorites(tool, position);
            modal.style.display = 'none';
        });
        
        modalToolsList.appendChild(toolElement);
    });
    
    // 显示弹窗
    modal.style.display = 'block';
}

/**
 * 获取所有可用工具列表
 * @returns {Array} 工具数组
 */
function getAllTools() {
    // 这里应该从服务器获取，简化起见直接从页面解析
    const tools = [];
    const allToolsContainer = document.getElementById('all-tools-container');
    const toolCards = allToolsContainer.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        if (card.dataset.toolId) {
            tools.push({
                id: card.dataset.toolId,
                name: card.querySelector('h3').textContent,
                description: card.querySelector('p').textContent,
                icon: card.querySelector('.tool-icon').textContent,
                url: card.getAttribute('href')
            });
        }
    });
    
    return tools;
}

/**
 * 添加工具到常用工具
 * @param {Object} tool - 工具对象
 * @param {string} position - 要添加到的位置
 */
function addToolToFavorites(tool, position) {
    const favoriteToolsContainer = document.getElementById('favorite-tools-container');
    const emptyCard = favoriteToolsContainer.querySelector(`.tool-card[data-position="${position}"]`);
    
    if (emptyCard) {
        // 创建新的工具卡
        const newToolCard = document.createElement('a');
        newToolCard.className = 'tool-card';
        newToolCard.href = tool.url;
        newToolCard.dataset.toolId = tool.id;
        newToolCard.dataset.position = position;
        
        newToolCard.innerHTML = `
            <div class="tool-icon">${tool.icon}</div>
            <h3>${tool.name}</h3>
            <p>${tool.description}</p>
            <button class="remove-btn" title="从常用工具中移除">✕</button>
        `;
        
        // 替换空卡片
        emptyCard.replaceWith(newToolCard);
        
        // 添加移除按钮事件
        const removeBtn = newToolCard.querySelector('.remove-btn');
        removeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            removeToolFromFavorites(position);
        });
        
        // 保存到本地存储
        saveFavoriteTools();
    }
}

/**
 * 从常用工具中移除工具
 * @param {string} position - 要移除的工具位置
 */
function removeToolFromFavorites(position) {
    const favoriteToolsContainer = document.getElementById('favorite-tools-container');
    const toolCard = favoriteToolsContainer.querySelector(`.tool-card[data-position="${position}"]`);
    
    if (toolCard) {
        // 创建空卡片
        const emptyCard = document.createElement('div');
        emptyCard.className = 'tool-card empty';
        emptyCard.dataset.position = position;
        
        emptyCard.innerHTML = `
            <div class="add-tool">+</div>
            <p>添加工具</p>
        `;
        
        // 替换工具卡
        toolCard.replaceWith(emptyCard);
        
        // 为空卡片添加点击事件
        emptyCard.addEventListener('click', function() {
            openToolSelectionModal(position);
        });
        
        // 保存到本地存储
        saveFavoriteTools();
    }
}

/**
 * 保存常用工具到本地存储
 */
function saveFavoriteTools() {
    const favoriteToolsContainer = document.getElementById('favorite-tools-container');
    const toolCards = favoriteToolsContainer.querySelectorAll('.tool-card:not(.empty)');
    
    const favorites = {};
    
    toolCards.forEach(card => {
        if (card.dataset.toolId && card.dataset.position) {
            favorites[card.dataset.position] = {
                id: card.dataset.toolId,
                url: card.getAttribute('href')
            };
        }
    });
    
    localStorage.setItem('favoriteTools', JSON.stringify(favorites));
}

/**
 * 从本地存储加载常用工具
 */
function loadFavoriteTools() {
    const savedTools = localStorage.getItem('favoriteTools');
    
    if (savedTools) {
        const favorites = JSON.parse(savedTools);
        
        // 获取所有工具
        const allTools = getAllTools();
        
        // 添加保存的常用工具
        for (const position in favorites) {
            const toolInfo = favorites[position];
            const tool = allTools.find(t => t.id === toolInfo.id);
            
            if (tool) {
                addToolToFavorites(tool, position);
            }
        }
    } else {
        // 如果用户没有设置过常用工具，则默认添加所有工具（最多7个）
        const allTools = getAllTools();
        allTools.slice(0, 7).forEach((tool, index) => {
            addToolToFavorites(tool, index.toString());
        });
        // 保存到本地存储
        saveFavoriteTools();
    }
}

// 为移除按钮添加特定样式
document.head.insertAdjacentHTML('beforeend', `
<style>
.remove-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(255, 0, 0, 0.1);
    border: none;
    color: #ff3b30;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
}

.tool-card:hover .remove-btn {
    opacity: 1;
}

.tool-card {
    position: relative;
}
</style>
`);

const availableTools = [
    {
        id: 'svg-to-image',
        name: 'SVG转图片',
        description: '将SVG矢量图转换为PNG/JPG图片',
        icon: '🖼️',
        url: 'tools/svg-to-image.html'
    },
    {
        id: 'excel-processor',
        name: 'Excel处理',
        description: '数据格式统一和重复数据处理',
        icon: '📊',
        url: 'tools/excel-processor.html'
    }
]; 