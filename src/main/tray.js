import { mainWindow } from './index'

const { app, Tray, nativeImage, Menu } = require('electron')
import Date from './common/date'

const path = require('path')
const resources_path = `../../resources/`

const INIT_TIME = 1500
const TITLE = 'Pomodoro Technique'

let tray
let is_working = false
let current_time
let running_time = INIT_TIME

let contextMenu = [
  {
    label: 'Start',
    type: 'normal',
    icon: nativeImage.createFromPath(
      path.join(__dirname, `${resources_path}${is_working ? 'pause' : 'start'}.png`)
    ),
    click() {
      if (is_working) {
        pause()
      } else {
        start()
      }
    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Next',
    type: 'normal',
    icon: nativeImage.createFromPath(path.join(__dirname, `${resources_path}next.png`)),
    click() {}
  },
  {
    label: 'Done',
    type: 'normal',
    icon: nativeImage.createFromPath(path.join(__dirname, `${resources_path}done.png`)),
    click() {

    }
  },
  {
    type: 'separator'
  },
  {
    label: 'Quit',
    type: 'normal',
    icon: nativeImage.createFromPath(path.join(__dirname, `${resources_path}exit.png`)),
    click() {
      quit()
    }
  }
]

const createTray = () => {
  let icon = nativeImage.createFromPath(path.join(__dirname, `${resources_path}icon.png`))
  icon = icon.resize({ width: 22, height: 22 })
  tray = new Tray(icon)
  // const image = NativeImage.createFromPath('@resources/icon.png')
  tray.setTitle(TITLE)
  update_tray_menu()
  return tray
}

const start = () => {
  if (!is_working) {
    const date = Date.format(running_time)
    tray.setTitle(date)

    current_time = setInterval(() => {
      if (running_time <= 0) {
        pause()
        running_time = INIT_TIME
        tray.setTitle(TITLE)
        return
      }
      running_time--
      const date = Date.format(running_time)
      tray.setTitle(date)
      mainWindow.webContents.send('isWorking', true)
    }, 1000)
    is_working = !is_working
    const menuItem = contextMenu.find((item) => item.label === 'Start')
    if (menuItem) {
      menuItem.label = 'Pause'
      menuItem.icon = nativeImage.createFromPath(
        path.join(__dirname, `${resources_path}${is_working ? 'pause' : 'start'}.png`)
      )
      update_tray_menu()
    }
  }
}

const pause = () => {
  if (is_working && current_time) {
    clearInterval(current_time)
    is_working = !is_working
    const menuItem = contextMenu.find((item) => item.label === 'Pause')
    if (menuItem) {
      menuItem.label = 'Start'
      menuItem.icon = nativeImage.createFromPath(
        path.join(__dirname, `${resources_path}${is_working ? 'pause' : 'start'}.png`)
      )
      update_tray_menu()
    }
  }
}

const quit = () => {
  app.quit()
}

const update_tray_menu = () => {
  contextMenu.forEach((item) => {
    if (item['icon']) {
      item['icon'] = item['icon'].resize({ width: 16, height: 16 })
    }
  })
  const menu = Menu.buildFromTemplate(contextMenu)
  Menu.setApplicationMenu(menu)
  tray.setContextMenu(menu)
}

const get_current_date = () => {
  return Date.format(running_time)
}

export { createTray, get_current_date }
