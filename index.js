const { app, BrowserWindow, ipcMain } = require("electron");
const { existsSync, readdirSync, readFileSync, unlinkSync, appendFileSync } = require("fs");
const { appendFile, readFile, writeFile, unlink, readdir } = require("fs/promises");
const { join } = require("path");
const path =require('path')
app.disableHardwareAcceleration()
//GLOBAL VARIABLES
let mainWindow
let detailsDbPath=join(app.getPath('userData'),'/scopion-media-details.json')
let folder_path_db =join(app.getPath('userData'),'/scopion-media-folderpaths.json')
// PROMINENT FUNCTIONS
// function to reiceive and verify folder's path return true if exist and vice-versa for songs
let verify_folder_path_for_videos=async(folder_db,folder_path)=>{
  let folderExists = existsSync(folder_db)
  if(folderExists){
try {
  let paths =await readFile(folder_db,'utf-8')
let {photos_paths,music_paths,videos_paths}=JSON.parse((paths))
let isAvailable =videos_paths.filter((item)=>{
 return item == folder_path
})
if(isAvailable.length !==0){
//if path already exists
return true
}else{
//if path dont exist
videos_paths.push(folder_path)
await unlink(folder_db)
let toAppend =JSON.stringify({
  videos_paths:videos_paths,
  music_paths:music_paths,
  photos_paths:photos_paths
})
await appendFile(folder_db,toAppend)
return false
}
} catch (error) {
  console.log(error.message)
}
  }else{
//when folder db dont exist

let toAppend =JSON.stringify({
  music_paths:[],
  videos_paths:[folder_path],
  photos_paths:[]
})
await appendFile(folder_db,toAppend)
return false
  }

}
// function to reiceive and verify folder's path return true if exist and vice-versa for songs
let verify_folder_path_for_songs=async(folder_db,folder_path)=>{
  let folderExists = existsSync(folder_db)
  if(folderExists){
try {
  let paths =await readFile(folder_db,'utf-8')
let {photos_paths,music_paths,videos_paths}=JSON.parse((paths))
let isAvailable =music_paths.filter((item)=>{
 return item == folder_path
})
if(isAvailable.length !==0){
//if path already exists
return true
}else{
//if path dont exist
music_paths.push(folder_path)
await unlink(folder_db)
let toAppend =JSON.stringify({
  videos_paths:videos_paths,
  music_paths:music_paths,
  photos_paths:photos_paths
})
await appendFile(folder_db,toAppend)
return false
}
} catch (error) {
  console.log(error.message)
}
  }else{
//when folder db dont exist

let toAppend =JSON.stringify({
  videos_paths:[],
  music_paths:[folder_path],
  photos_paths:[]
})
await appendFile(folder_db,toAppend)
return false
  }

}
// function to reiceive and verify folder's path return true if exist and vice-versa for photos
let verify_folder_path_for_photos=async(folder_db,folder_path)=>{
  let folderExists = existsSync(folder_db)
  if(folderExists){
try {
  let paths =await readFile(folder_db,'utf-8')
let {photos_paths,music_paths,videos_paths}=JSON.parse((paths))
let isAvailable =photos_paths.filter((item)=>{
 return item == folder_path
})
if(isAvailable.length !==0){
//if path already exists
return true
}else{
//if path dont exist
photos_paths.push(folder_path)
await unlink(folder_db)
let toAppend =JSON.stringify({
  videos_paths:videos_paths,
  music_paths:music_paths,
  photos_paths:photos_paths
})
await appendFile(folder_db,toAppend)
return false
}
} catch (error) {
  console.log(error.message)
}
  }else{
//when folder db dont exist

let toAppend =JSON.stringify({
  videos_paths:[],
  music_paths:[],
  photos_paths:[folder_path]
})
await appendFile(folder_db,toAppend)
return false
  }

}
//function to create a window
let createWindow=(preload_path,index_path)=>{
mainWindow = new BrowserWindow({
  frame:false,
  width:900,
  height:600,
  minHeight:600,
  minWidth:900,
  movable:true,
  webPreferences:{
    preload:preload_path
  }
})
mainWindow.setBackgroundColor('rgb(73, 105, 105)')
mainWindow.loadFile(index_path)

}
//LOAD A WINDOW WHEN THE APP IS READY
app.on('ready',async()=>{
 
  createWindow(path.join(__dirname,'/renderer/preload/preload.js'),path.join(__dirname,'/renderer/templates/index.html'))
//CREATE A NEW WINDOW WHEN NO WINDOWS ARE ARE OPEN BUT THE APP IS STILL RUNNING IN THE BACKGROUND ON MACOS
app.on('activate',()=>{
  if(BrowserWindow.fromWebContents().length==0){
    createWindow(path.join(__dirname,'/renderer/preload/preload.js'),path.join(__dirname,'/renderer/templates/index.html'))
  }
})
})
// QUITING THE APP WHEN ALL WINDOWS ARE CLOSED ON LINUX AND WINDOWS
app.on('window-all-closed',()=>{
  if(process.platform !== 'darwin'){
app.quit()
  }
})
//MINIMIZE  MAIN WINDOW
ipcMain.on('minimize',()=>{
mainWindow.minimize()
})
//MAXIMIZE MAIN WINDOW
ipcMain.on('maximize',()=>{
  mainWindow.maximize()
})
//CLOSE MAIN WINDOW
ipcMain.on('close',()=>{
  mainWindow.close()
})

// UNMAXIMIZED MAIN WINDOW
ipcMain.on('unmaximize',()=>{
  mainWindow.unmaximize()
})
//RETURN COLOR STATUS
ipcMain.handle('color-status-check',async()=>{
  let fileExists=existsSync(detailsDbPath)
  if(fileExists){
let data=await readFile(detailsDbPath,'utf-8')
return JSON.parse(data)
  }else{

  let appDetails=JSON.stringify({isDarkMode:true})
  await appendFile(detailsDbPath,appDetails)
  let data=await readFile(detailsDbPath,'utf-8')
return JSON.parse(data)

  }
})
// CHANGE STATUS COLOR OF BACK-GROUND
ipcMain.on('change-color-status',async(e,isDarkMode)=>{
  if(isDarkMode){
    let fileExists=existsSync(detailsDbPath)
    if(fileExists){
      await unlink(detailsDbPath)
      let appDetails=JSON.stringify({isDarkMode:true})
      await appendFile(detailsDbPath,appDetails)
    }else{
  let appDetails=JSON.stringify({isDarkMode:true})
  await appendFile(detailsDbPath,appDetails)
    }
   
  }else{
    let fileExists=existsSync(detailsDbPath)
    if(fileExists){
      await unlink(detailsDbPath)
      let appDetails=JSON.stringify({isDarkMode:false})
      await appendFile(detailsDbPath,appDetails)
    }else{
  let appDetails=JSON.stringify({isDarkMode:true})
  await appendFile(detailsDbPath,appDetails)
    }
  }
})
//SAVING AND VERIFYING FOLDER'S PATH FOR PHOTOS
ipcMain.handle('photo-folder-path',async(e,folderPath)=>{
  let res=await verify_folder_path_for_photos(folder_path_db,folderPath)
  return res
})


ipcMain.handle('stored-photos',async()=>{
  let main_db_exists = existsSync(folder_path_db)
  if(main_db_exists){
    let data=  readFileSync(folder_path_db,'utf-8')
    let {photos_paths}=JSON.parse(data)
    //removing non existing paths
    let existing_paths=photos_paths.filter((item)=>{
    if(existsSync(item)==true){
      return item
    }else{
      console.log(item)
      let data=readFileSync(folder_path_db,'utf-8')
    let {videos_paths,music_paths,photos_paths}=JSON.parse(data)
    let updated = photos_paths.filter((filt)=>{
      return filt !== item
    })
    unlinkSync(folder_path_db)
    let toAppend =JSON.stringify({
      videos_paths:videos_paths,
      music_paths:music_paths,
      photos_paths:updated
    })
    appendFileSync(folder_path_db,toAppend)
    console.log('updated')
    }
    })
    // reading directories of every existing path
    let files= existing_paths.map((item)=>{
      let files_availble =readdirSync(item)
      return files_availble
    })
    // filtering only image types
    let filtered_files=files.map((item)=>{
    let filterate=item.filter((filt)=>{
    return filt.includes('.png') == true || filt.includes('.jpg') == true || filt.includes('.gif') == true ||filt.includes('.webp') == true
    })
    return filterate
    })
    return {existing_paths,filtered_files}
  }else{
    let toAppend =JSON.stringify({
      videos_paths:[],
      music_paths:[],
      photos_paths:[]
    })
    await appendFile(folder_path_db,toAppend)
return {existing_paths:[],filtered_files:[]}
  }
  
})



//SAVING AND VERIFYING FOLDER'S PATH FOR SONGS
ipcMain.handle('song-folder-path',async(e,folderPath)=>{
  let res=await verify_folder_path_for_songs(folder_path_db,folderPath)
  return res
})
//RETURNING STORED SONGS PATH
ipcMain.handle('stored-songs',async()=>{
  let main_db_exists = existsSync(folder_path_db)
  if(main_db_exists){
//read database
let data=  readFileSync(folder_path_db,'utf-8')
//getting only music paths
let {music_paths}=JSON.parse(data)
//removing non existing paths
let existing_paths=music_paths.filter((item)=>{
if(existsSync(item)==true){
return item
}else{
// removing the non existing paths
let data=readFileSync(folder_path_db,'utf-8')
let {videos_paths,music_paths,photos_paths}=JSON.parse(data)
let updated = music_paths.filter((filt)=>{
return filt !== item
})
//updating  an array
unlinkSync(folder_path_db)
let toAppend =JSON.stringify({
videos_paths:videos_paths,
music_paths:updated,
photos_paths:photos_paths
})
appendFileSync(folder_path_db,toAppend)
console.log('updated')
}
})
// reading directories of every existing path
let files= existing_paths.map((item)=>{
let files_availble =readdirSync(item)
return files_availble
})
// filtering only songs types of mp3
let filtered_files=files.map((item)=>{
let filterate=item.filter((filt)=>{
return filt.includes('.mp3') == true  || filt.includes('.m4a') == true //|| filt.includes('.gif') == true ||filt.includes('.webp') == true
})
return filterate
})
return {existing_paths,filtered_files}
  }else{
    let toAppend =JSON.stringify({
      videos_paths:[],
      music_paths:[],
      photos_paths:[]
    })
    await appendFile(folder_path_db,toAppend)
return {existing_paths:[],filtered_files:[]}
  }
  
})
//SAVING AND VERIFYING FOLDER'S PATH FOR VIDEOS
ipcMain.handle('video-folder-path',async(e,folderPath)=>{
  let res=await verify_folder_path_for_videos(folder_path_db,folderPath)
  return res
})

//RETURNING STORED VIDEOS PATH
ipcMain.handle('stored-videos',async()=>{
  let main_db_exists = existsSync(folder_path_db)
  if(main_db_exists){
    //read database
  let data=  readFileSync(folder_path_db,'utf-8')
  //getting only video paths
let {videos_paths}=JSON.parse(data)
//removing non existing paths
let existing_paths=videos_paths.filter((item)=>{
if(existsSync(item)==true){
  return item
}else{
  // removing the non existing paths
  let data=readFileSync(folder_path_db,'utf-8')
let {videos_paths,music_paths,photos_paths}=JSON.parse(data)
let updated = videos_paths.filter((filt)=>{
  return filt !== item
})
//updating  an array
unlinkSync(folder_path_db)
let toAppend =JSON.stringify({
  videos_paths:updated,
  music_paths:music_paths,
  photos_paths:photos_paths
})
appendFileSync(folder_path_db,toAppend)
console.log('updated')
}
})
// reading directories of every existing path
let files= existing_paths.map((item)=>{
  let files_availble =readdirSync(item)
  return files_availble
})
// filtering only videos types of mp4 and webm
let filtered_files=files.map((item)=>{
let filterate=item.filter((filt)=>{
return filt.includes('.mp4') == true  || filt.includes('.webm') == true //|| filt.includes('.gif') == true ||filt.includes('.webp') == true
})
return filterate
})
return {existing_paths,filtered_files}
  }else{
    let toAppend =JSON.stringify({
      videos_paths:[],
      music_paths:[],
      photos_paths:[]
    })
    await appendFile(folder_path_db,toAppend)
return {existing_paths:[],filtered_files:[]}
  }
  
})