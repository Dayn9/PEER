
const handleFileUpload = (e) => {

    $("#messageBox").animate({width:'hide'},350);
    window.location = '/maker';
  
    return false;
  }

const UploadForm = (props) => {
    return(
        <form 
            //ref='uploadForm' 
            id='uploadForm' 
            onSubmit={handleFileUpload}
            action='/upload' 
            method='POST' 
            encType="multipart/form-data">
        <input id = "file" type="file" name="sampleFile" />
        <input type="hidden" name="_csrf" value={props.csrf} />
        <input type='submit' value='Upload!' />
        </form> 
    );
};
  
//MAY BE USED LATER FOR DOWNLOAD CSV FEATURE
const RetrieveForm = (props) => {
    return(
        <form ref='retrieveForm' 
            id='retrieveForm' 
            action='/retrieve' 
            method='get'>
          <label for='fileName'>Retrieve File By Name: </label>
          <input name='fileName' type='text' />
          <input type="hidden" name="_csrf" value={props.csrf} />
          <input type='submit' value='Download!' />
          
        </form>
    );
};
