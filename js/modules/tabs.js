function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    //Tabs

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);
    
    function hideTabContent() {
            tabsContent.forEach (item => {
                item.style.display = 'none';
            });
            
            tabs.forEach(item => {
                item.classList.remove(activeClass);
            });
    }
        
    
    
    function showTabContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabs[i].classList.add(activeClass);
    }
    
    
    
    
    /* Вызов функций */
     hideTabContent();
     showTabContent();
    
    
    tabsParent.addEventListener('click', (e) => { 
        const target = e.target;
    
        if (target && target.classList.contains(tabsSelector.slice(1))) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
    
    });
}

export default tabs;