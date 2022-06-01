// TARGET ELEMENTS
let dark_mode_toggle = document.querySelector('.ball-wrapper')
let minimize = document.querySelector('.minimize')
let maximize  = document.querySelector('.maximize')
let close = document.querySelector('.close')
let ball=document.querySelector('.ball')
let right_bar= document.querySelector('#right-bar')
let frame= document.querySelector('#frame')
let left_bar= document.querySelector('#left-bar')
let minimize_child = document.querySelector('.minimize div')
let maximize_child  = document.querySelector('.maximize div')
let close_child = document.querySelector('.close .lines .line1')
let close_child2 = document.querySelector('.close .lines .line2')
let left_bar_children= document.querySelectorAll('#left-bar div a')
let folder_wrapper = document.querySelector('.box1')
let file_wrapper = document.querySelector('.box2')
let box1_text = document.querySelector('.box1-text')
let box2_text = document.querySelector('.box2-text')
let list_wrapper =document.querySelector('.list')
let image_to_view = document.querySelector('.image_to_view')
let layer1 =document.querySelector('.layer1')
let layer2 =document.querySelector('.layer2')
let next =document.querySelector('.next')
let prev =document.querySelector('.prev')
let file = document.querySelector('#file')
let msg= document.querySelector('.msg')
let results_found= document.querySelector('.results-found')
let image_wrapper = document.querySelector('.item-wrapper')
//GLOBAL VARIABLE
let isMaximized=false
let isDarkMode= true
let images_found =[]
let viewed_image 
let isViewed =false
//PROMINENT FUNCTIONS
   //function to display an image
let viewPhoto=(e)=>{
viewed_image=e.srcElement.id
let selected_image= images_found[e.srcElement.id]
layer1.setAttribute('style','display:none;')
layer2.setAttribute('style','display:block;')

if (isDarkMode) {
    
layer2.setAttribute('class','layer2')
} else {
    
layer2.setAttribute('class','layer2 layer2_light')
}

image_to_view.src=selected_image.path
isViewed=true
}
// REQUEST TO PRELOAD  TO MINIMIZE , MAXIMIZE, UNMIXIMIZE AND CLOSE WINDOW
// minimize
minimize.onclick =()=>{
    window.api.minimize()
}

maximize.onclick =()=>{

   if(isMaximized){
       //unmaximize
    window.api.unMaximize()
    isMaximized=false
   }else{
       // maximize
    window.api.maximize()
    isMaximized=true
   }
}
close.onclick =()=>{
    window.api.close()
}

//DARKMODE TOGGLING
dark_mode_toggle.onclick=()=>{

    if(isDarkMode){
        //from darkmode
ball.setAttribute('style','left:0;background-color:grey;')
right_bar.setAttribute('style',' background-color: rgb(219, 212, 212);')
frame.setAttribute('style',' background-color: rgb(255, 255, 255);')
dark_mode_toggle.setAttribute('style',' border: 2px grey solid;')
left_bar.setAttribute('style','background-color:#eeeeeeee;')
minimize_child.setAttribute('style',' background-color:grey;')
maximize_child.setAttribute('style',' border:2px grey solid;')
close_child.setAttribute('style',' background-color:grey;')
close_child2.setAttribute('style',' background-color:grey;')
file_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
folder_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
box1_text.setAttribute('style','color:black;')
box2_text.setAttribute('style','color:black;')
layer2.setAttribute('class','layer2 layer2_light')
image_wrapper?.setAttribute('style','background-color: rgb(179, 193, 193);')
left_bar_children.forEach((e)=>{
    e.setAttribute('style','color:black;')
})
isDarkMode=false
window.api.changeColorStatus(isDarkMode)
if(isViewed==false){
    window.location.reload()
}

    }else{
        // to dark mode
ball.setAttribute('style','right:0;')
right_bar.removeAttribute('style')
frame.removeAttribute('style')
dark_mode_toggle.removeAttribute('style')
left_bar.removeAttribute('style')
minimize_child.removeAttribute('style')
maximize_child.removeAttribute('style')
close_child.removeAttribute('style')
close_child2.removeAttribute('style')
folder_wrapper.removeAttribute('style')
file_wrapper.removeAttribute('style')
box1_text.removeAttribute('style')
box2_text.removeAttribute('style')
image_wrapper?.removeAttribute('style')
layer2.setAttribute('class','layer2')
left_bar_children.forEach((e)=>{
    e.removeAttribute('style')
})
isDarkMode=true
window.api.changeColorStatus(isDarkMode)

if(isViewed==false){
    window.location.reload()
}
    }
}
// HOVERING IN LIGHT MODE
minimize.onmouseover =(e)=>{
if(!isDarkMode){
e.target.setAttribute('style',' background-color:#eee;')
}
}
minimize.onmouseleave =(e)=>{
    if(!isDarkMode){
    e.target.removeAttribute('style')
minimize_child.setAttribute('style',' background-color:grey;') 
}
}

maximize.onmouseover =(e)=>{
    if(!isDarkMode){
    e.target.setAttribute('style',' background-color:#eee;')
    maximize_child.setAttribute('style',' border:2px grey solid;')
    }
    }
maximize.onmouseleave =(e)=>{
        if(!isDarkMode){
        e.target.removeAttribute('style')
    }
    }
left_bar_children.onmouseover =(e)=>{
    if(!isDarkMode){
        console.log(e)
    e.target.setAttribute('style',' background-color:#eee;')
    }
    }
    left_bar_children.forEach((e)=>{
        e.onmouseover =(e)=>{
            if(!isDarkMode){
         e.target.setAttribute('style',' background-color:rgb(172, 177, 177);color:white;')
            }
    }
     e.onmouseleave=(e)=>{
        if(!isDarkMode){
            e.target.removeAttribute('style')
            e.target.setAttribute('style','color:black;')
        }
     }
    })

window.onload =async()=>{
    // CHECKING THE BACKGROUND COLOR STATUS WHEN WINDOW LOADS
let res=await window.api.colorStatusCheck()
isDarkMode = res.isDarkMode
  if(isDarkMode){
       // to dark mode
       ball.setAttribute('style','right:0;')
       right_bar.removeAttribute('style')
       frame.removeAttribute('style')
       dark_mode_toggle.removeAttribute('style')
       left_bar.removeAttribute('style')
       minimize_child.removeAttribute('style')
       maximize_child.removeAttribute('style')
       close_child.removeAttribute('style')
       close_child2.removeAttribute('style')
       folder_wrapper.removeAttribute('style')
       file_wrapper.removeAttribute('style')
       box1_text.removeAttribute('style')
       box2_text.removeAttribute('style')
       results_found.removeAttribute('style')
       msg.removeAttribute('style')
       image_wrapper?.removeAttribute('style')
       left_bar_children.forEach((e)=>{
           e.removeAttribute('style')
       })
  }else{
            // to light mode
ball.setAttribute('style','left:0;background-color:grey;')
right_bar.setAttribute('style',' background-color: rgb(219, 212, 212);')
frame.setAttribute('style',' background-color: rgb(255, 255, 255);')
dark_mode_toggle.setAttribute('style',' border: 2px grey solid;')
left_bar.setAttribute('style','background-color:#eeeeeeee;')
minimize_child.setAttribute('style',' background-color:grey;')
maximize_child.setAttribute('style',' border:2px grey solid;')
close_child.setAttribute('style',' background-color:grey;')
close_child2.setAttribute('style',' background-color:grey;')
file_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
box1_text.setAttribute('style','color:black;')
box2_text.setAttribute('style','color:black;')
msg.setAttribute('style','color :rgb(60, 54, 54);')
results_found.setAttribute('style','color :rgb(60, 54, 54);')
folder_wrapper.setAttribute('style',' background: rgb(199, 195, 195) ;box-shadow: 5px 7px 5px 0px rgb(137, 149, 149);')
image_wrapper?.setAttribute('style',' background-color: rgb(179, 193, 193);')

left_bar_children.forEach((e)=>{
    e.setAttribute('style','color:gray;')
})
  }
//FETCHING FILES FOR STORED PATH
let stored_photos= await window.api.fetch_photos()
console.log(stored_photos)

if(stored_photos.filtered_files.length ==0){
    //when not files are stored
    msg.textContent =" choose a file or folder"
}else{
    //when some files are stored
stored_photos.filtered_files.forEach((item,index_path)=>{
    item.forEach((data,file_index)=>{
let myPath =`${stored_photos.existing_paths[index_path]}${data}`
let obj ={path:myPath,name:data}
images_found.push(obj)
let div = document.createElement('div')
let img = document.createElement('img')
let p = document.createElement('p')
div.classList.add('item-wrapper')
div.onclick =viewPhoto
if (isDarkMode==false) {
    div.setAttribute('style','background-color: rgb(179, 193, 193);')
    p.setAttribute('style','color :rgb(60, 54, 54);')
    results_found.setAttribute('style','color :rgb(60, 54, 54);')
    msg.setAttribute('style','color :rgb(60, 54, 54);')
    }
let index =images_found.length-1
div.id=index
img.id=index
p.id=index
img.src=myPath
p.innerHTML=data
div.appendChild(img)
div.appendChild(p)
list_wrapper.appendChild(div)
results_found.textContent = `${images_found.length} images found`
    })
})
} 

}
// MANIPULATING OPENNED FOLDER
document.querySelector('#folder').addEventListener('change',async(e)=>{
    if(e.target.files.length !==0){
// when the chosen folder is not empty
// logic to get the path of the folder

let first_file_name = e.target.files[0].name
let first_file_path = e.target.files[0].path
let folder_path = first_file_path.split(first_file_name)[0]
// sending path to store it and check if it already exist returning true if exists and vice-versa
let folderExist=await window.api.send_photo_folder_path(folder_path)
if(folderExist){
//when the path chosen has already been 
msg.textContent = 'the images of that folder are already available , kindly choose any other folder'
}else{
     //when the path chosen is not stored in db....
//filtering photos only     
let allFiles=Array.from(e.target.files)
let filtered=allFiles.filter((item)=>{
return item.type.includes('image/') == true
})
if(filtered.length == 0){
    msg.textContent ='there are no image types in the chosen folder or the images formats are not supported'
}else{
//looping to display a list of images
filtered.forEach((item)=>{
    images_found.push(item)
    let div = document.createElement('div')
    let img = document.createElement('img')
    let p = document.createElement('p')
    div.classList.add('item-wrapper')
    if (isDarkMode==false) {
    div.setAttribute('style','background-color: rgb(179, 193, 193);')
    p.setAttribute('style','color :rgb(60, 54, 54);')
    }
    div.onclick =viewPhoto
let index =images_found.length==0?0:images_found.length-1
    div.id=index
    img.id=index
    p.id=index
    img.src=item.path
    p.innerHTML=item.name
    div.appendChild(img)
    div.appendChild(p)
    list_wrapper.appendChild(div)
    results_found.textContent =`${images_found.length} images found`
})
 
}

}
    }else{
        //when the chosen folder is empty
        msg.textContent='the selected folder is empty choose another one'
    }
})
// TO VIEW THE NEXT IMAGE
next.onclick=()=>{
    if(viewed_image ==images_found.length-1){
        //when its the last image
viewed_image =0
let selected_image= images_found[viewed_image]
image_to_view.src=selected_image.path
    }else{
        //when its not on the last index
    viewed_image++
    let selected_image= images_found[viewed_image]
    image_to_view.src=selected_image.path
    }
}
// TO VIEW PREVIOUS IMAGE
prev.onclick=()=>{
    if(viewed_image ==0){
        //when its the first image
viewed_image =images_found.length-1
let selected_image= images_found[viewed_image]
image_to_view.src=selected_image.path
    }else{
        //when its not on the first index
    viewed_image--
    let selected_image= images_found[viewed_image]
    image_to_view.src=selected_image.path
    }
}
// RECEIVING AND PROCESSING A FILE
file.onchange =(e)=>{
let selected_file = e.target.files[0]
if(selected_file.type.includes('image/') == true){
    layer1.setAttribute('style','display:none;')
    layer2.setAttribute('style','display:block;')
    next.setAttribute('style','display:none;')
    prev.setAttribute('style','display:none;')
    image_to_view.src=selected_file.path
}else{
    msg.textContent='the selected file is not an image type or the format is not supported'
}

}
window.onkeyup=(e)=>{
    if(isViewed){
//returning to the image list when b is clicked
        if(e.key=='b'){
        isViewed=false
        layer2.removeAttribute('style')
        layer1.removeAttribute('style')

        }else if(e.key=='ArrowLeft'){
// showing the previous image when left arrow button is clicked
            if(viewed_image ==0){
                //when its the first image
        viewed_image =images_found.length-1
        let selected_image= images_found[viewed_image]
        image_to_view.src=selected_image.path
            }else{
                //when its not on the first index
            viewed_image--
            let selected_image= images_found[viewed_image]
            image_to_view.src=selected_image.path
            }
        }else if(e.key=='ArrowRight'){
//showing the next image when the right arrow is button is clicked
            if(viewed_image ==images_found.length-1){
                //when its the last image
        viewed_image =0
        let selected_image= images_found[viewed_image]
        image_to_view.src=selected_image.path
            }else{
                //when its not on the last index
            viewed_image++
            let selected_image= images_found[viewed_image]
            image_to_view.src=selected_image.path
            }
        
        }
        
    }else{
        //returning to the image list when b is clicked
        if(e.key=='b'){
            isViewed=false
            layer2.removeAttribute('style')
            layer1.removeAttribute('style')
        }    
    }

}