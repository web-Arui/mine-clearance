let gdsz= []
var surTh =10 //剩余雷数
let onOff = true
allEvent()
function allEvent(){  //所有的事件
    beginGame.addEventListener('click',()=>{  //开始游戏
        if(onOff){
            box.style.display = 'block'
            surplus.style.display = 'block'
            init()
            onOff = false
        }
    })
    again.addEventListener('click',()=>{  //重新开始
        box.innerHTML = ''
        onOff = true
        if(onOff){
            box.style.display = 'block'
            surplus.style.display = 'block'
            init()
            onOff = false
        }
    })
    box.oncontextmenu = ()=>{ //取消右侧默认菜单
        return false
    }
    box.addEventListener('mousedown',(e)=>{
        let event = e.target
        if(e.which===1){ //判断是左键还是右键点击
            leftClick(event)
        }else if(e.which === 3){
            rightClick(event) 
        }
    })
    let close = document.querySelector('.close')
    close.addEventListener('click',()=>{
        alertBox.style.display = 'none'
        surplus.style.display = 'none'
        box.style.display = 'none'
        onOff =true
        box.innerHTML = ''
    })
}
function init(){  //创建100个小格，并随机放10个雷
    let totalNum=10 //总雷数
    let surplusNum = 10 //剩余雷数
    score.innerHTML = surplusNum
    for(i = 0; i<10; i++){
        for(j = 0; j<10; j++){
            let con = document.createElement('div')
            con.classList.add('img')
            con.setAttribute('id',i+'-'+j)
            box.appendChild(con)
            gdsz.push({mine:0})
        }
    }
    let child = document.querySelectorAll('.img')
    while(totalNum){  //随机生成10个雷
        let mineIndex = Math.floor(Math.random()*100)
            if(gdsz[mineIndex].mine === 0){ //避免重复
                gdsz[mineIndex].mine = 1
                child[mineIndex].classList.add('isThunder')
                totalNum--
            }
    }
}

function leftClick(dom){ //鼠标左键点击
    let isThunder = document.querySelectorAll('.isThunder')
    if(dom && dom.classList.contains('isThunder')){
        for(let i=0;i<isThunder.length;i++){
            isThunder[i].classList.add('show')
        }
        setTimeout(()=>{
            alertBox.style.display = 'block'
            alertImg.style.background="url(../img/fail.jpg)"
            alertImg.style.backgroundSize = '100% 100%'
        },800)
    }else{
        if(dom.classList.contains('flag')){
            return false
        }
        let n = 0
        let newArr = dom && dom.getAttribute('id').split('-')
        let arrX = newArr && +newArr[0]
        let arrY = newArr && +newArr[1]
        dom && dom.classList.add('num')
        for(let i = arrX-1;i<=arrX+1;i++){  //循环找到小格周围的雷
            for(let j = arrY-1; j<=arrY+1; j++){
                let newGdsz = document.getElementById(i+'-'+j)
                if(newGdsz && newGdsz.classList.contains('isThunder')){
                    n++
                }
            }
        }
        dom.innerHTML = n
        if(n==0){  //当周围雷数为0时
            for(let i =arrX-1; i<=arrX+1; i++){
                for(let j =arrY-1; j<=arrY+1;j++){
                    let new2 = document.getElementById(i+'-'+j)
                    if(new2 && new2.length !=0){
                        if(!new2.classList.contains('check')){
                            new2.classList.add('check')
                            leftClick(new2)  //在调用此函数
                        }
                        
                    }
                }
            }
        }

    }
}

function rightClick(dom){
    if(dom.classList.contains('num')){
        return
    }
    dom.classList.toggle('flag')
    if(dom.classList.contains('isThunder')&&dom.classList.contains('flag')){
        surTh--
    }
    if(dom.classList.contains('isThunder') && !dom.classList.contains('flag')){
        surTh++
    }
    let score = document.getElementById('score')
    score.innerHTML = surTh
    if(surTh==0){
        box.onclick = ()=>{return false}
        if(dom.classList.contains('isThunder')){
            setTimeout(()=>{
                alertBox.style.display = 'block'
                alertImg.style.background="url('../img/success.jpg')"
                alertImg.style.backgroundSize = '100% 100%'
            },800)
        }
       
    }

}