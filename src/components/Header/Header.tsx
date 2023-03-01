import React from 'react'
import { PomodoroIcon, StatisticIcon } from '../Icons'
import './header.css'

export function Header() {

	return (
		<header className='header'>
            <div>
                <PomodoroIcon />
                <p>Pomodoro_box</p>
            </div>
            <div>
                <StatisticIcon />
                <a href="">Статистика</a>
            </div>
        </header>
	)
}