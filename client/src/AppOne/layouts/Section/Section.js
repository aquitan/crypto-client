import React from 'react'
import cls from './Section.module.css'

const Section = ({children, ...props}) => {
    let classes = [cls.section]

    switch(props.color) {
        case 'tomato':
            classes.push(cls.tomato)
            break;
        case 'blue':
            classes.push(cls.blue)
            break;
        case 'orange':
            classes.push(cls.orange)
            break;
        case 'purple':
            classes.push(cls.purple)
            break;
        case 'green':
            classes.push(cls.green)
            break;
        case 'yellow':
            classes.push(cls.yellow)
            break;
        default :
            break;
    }

    return (
        <section id={props.id} className={classes.join(' ')}>
            {children}
        </section>
    )
}

export default Section