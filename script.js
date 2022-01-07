class Slider {
    constructor({ el, direction, time, autoplay, interval }) {
        this.slider = document.querySelector(el);
        this.sliderLine = this.slider.querySelector('.slider__line')
        this.slides = [...this.sliderLine.children]
        this.dir = direction.toUpperCase() === 'Y' ? 'Y' : 'X'
        this.timeMove = time || 1000
        this.interval = this.timeMove + 1000 < interval ? interval : this.timeMove + 3000
        this.prev = this.slider.querySelector('.slider__prev')
        this.next = this.slider.querySelector('.slider__next')
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.moveSize = this.dir == 'X' ? this.width : this.height
        this.activeSlide = 0
        this.sliderLine.style = `
        position:relative;
        height:${this.height}px;
        overflow:hidden
       `

        this.slides.forEach((sl, i) => {
            sl.style = `
                position:absolute;
                height:${this.height}px;
                width:${this.width}px;
            `
            if (i !== this.activeSlide) {
                sl.style.transform = `translate${this.dir}(${this.moveSize}px)`
            }
            if (i == this.slides.length - 1) {
                sl.style.transform = `translate${this.dir}(-${this.moveSize}px)`
            }
        })

        this.prev.onclick = () => this.move(this.prev)
        this.next.onclick = () => this.move(this.next)

        if (autoplay) {
           let intervalId = setInterval(() => this.move(this.next), this.interval);
           
           this.slider.addEventListener('mouseenter', () => {
               clearInterval(intervalId)
           })
           
           this.slider.addEventListener('mouseleave', () => {
               intervalId = setInterval(() => this.move(this.next), this.interval);
           })
        }
    }

    move(btn) {
        this.prev.disabled = true
        this.next.disabled = true
        setTimeout(() => {
            this.prev.disabled = false
            this.next.disabled = false
        }, this.timeMove);
        let btnLeftOrRight = btn == this.next ? this.moveSize * -1 : this.moveSize

        this.slides.forEach((sl, i) => {
            sl.style.transition = '0ms'
            if (i !== this.activeSlide) {
                sl.style.transform = `translate${this.dir}(${btnLeftOrRight * -1}px)`
            }
        })

        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms'
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(${btnLeftOrRight}px)`


        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.slides.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.slides.length - 1
            }
        }
        this.slides[this.activeSlide].style.transition = this.timeMove + 'ms'
        this.slides[this.activeSlide].style.transform = `translate${this.dir}(0px)`
    }

}





const slider = new Slider({
    el: '#slider1',
    direction: 'X',
    time: 1000,
    autoplay: true,
    interval: 3000
})






































// rest - html kalleksiyani yoki argumentlarni massiv qilib beradi
// spreat - massivni [] qovuslarini olib tashlaydi yani ichidagi qiymatlarni qovusdan olib beradi

// function summ(a,b,c) {
//     return a + b + c
// }                                           // rest va spreat haqida malumot berish
// const arr = [1,2,3]
// console.log(summ(...arr));

