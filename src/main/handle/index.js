const { ipcMain } = require('electron')
import { get_current_date } from '../tray'

const IpcHandle = () => {
  ipcMain.handle('update-date', () => {
    return get_current_date()
  })
}

export default IpcHandle

