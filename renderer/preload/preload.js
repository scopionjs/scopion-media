const { contextBridge, ipcRenderer } = require("electron");
let fs = require('fs')
contextBridge.exposeInMainWorld("api",{
//MAXIMIZE WINDOW
 maximize:()=>{
ipcRenderer.send('maximize')
},
//MINIMIZE WINDOW
minimize:()=>{
ipcRenderer.send('minimize')
},
// CLOSE WINDOW
close:()=>{
    ipcRenderer.send('close')
}
,
// UN MAXIMIZE WINDOW
unMaximize:()=>{
ipcRenderer.send('unmaximize')
}
,
//COLOR STATUS TO MAIN RECEIVING A BOOLEAN
colorStatusCheck:async()=>{
let isDarkMode =await ipcRenderer.invoke('color-status-check')
return isDarkMode
},
changeColorStatus:(isDarkMode)=>{
    ipcRenderer.send('change-color-status',isDarkMode)
}
,
//SENDING FOLDER'S PATH FOR PHOTOS TO MAIN RECEIVING BOOLEAN 
send_photo_folder_path:async(folder_path)=>{
let folderExists=await ipcRenderer.invoke('photo-folder-path',folder_path)
return folderExists
}
,
//REQUEST TO MAIN FOR FETCH FILES OF STORED PATHS
fetch_photos:async()=>{
    let res=await ipcRenderer.invoke('stored-photos')
    return res 
}
,
//SENDING FOLDER'S PATH FOR PHOTOS TO MAIN RECEIVING BOOLEAN 
send_song_folder_path:async(folder_path)=>{
    let folderExists=await ipcRenderer.invoke('song-folder-path',folder_path)
    return folderExists
    }
,
//REQUEST TO MAIN FOR FETCH FILES OF STORED PATHS
fetch_stored_songs:async()=>{
    let res=await ipcRenderer.invoke('stored-songs')
    return res 
}
,
//SENDING FOLDER'S PATH FOR VIDEOS TO MAIN RECEIVING BOOLEAN 
send_video_folder_path:async(folder_path)=>{
    let folderExists=await ipcRenderer.invoke('video-folder-path',folder_path)
    return folderExists
    }
,
//REQUEST TO MAIN FOR FETCH FILES OF STORED PATHS
fetch_stored_videos:async()=>{
    let res=await ipcRenderer.invoke('stored-videos')
    return res 
}
})
