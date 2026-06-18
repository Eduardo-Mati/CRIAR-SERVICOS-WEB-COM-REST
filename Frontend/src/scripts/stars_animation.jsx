setTimeout(() => {

    const container = document.getElementById('stars-container')
    
    for(let i = 0; i<28; i++){
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3 +1.5;
        star.style.cssText = `
            width: ${size}px; 
            height: ${size}px;
            top: ${Math.random() * 80}%;
            left: ${Math.random() * 100}%;
            opacity: ${0.4 + Math.random() * 0.6};
            `;
        container.appendChild(star);
    }
    
    
    
    
    
    const shoots = [
        {top:'12%', left:'15%', delay:'0s'},
        {top:'22%', left:'50%', delay:'1.8s'},
        {top:'8%', left:'70%', delay:'3.2s'}
    
    
    ]
    
    
    
    shoots.forEach(({ top,left,delay})=>{
        const el = document.createElement('div');
        el.className = 'shooting';
        el.style.cssText = `top:${top}; left:${left}; animation-delay:${delay}`;
        container.appendChild(el);
    
    
    })
}, 2000)