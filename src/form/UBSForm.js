import { useState } from 'react';

const UBSForm = () => {
    const [nameValue, setNameValue] = useState("");
    const [attr1Value, setattr1Value] = useState("");
    const [attr2Value, setattr2Value] = useState("");

    const callSubmit = () => {
        let data = {name:nameValue,attributes:[]};

        console.log(nameValue, attr1Value, attr2Value);
        if(attr1Value && attr2Value){
            data.attributes.push({"attr1":attr1Value,"attr2":attr2Value});
        } else if(attr1Value) {
            data.attributes.push({"attr1":attr1Value});
        }else if(attr2Value) {
            data.attributes.push({"attr2":attr2Value});
        }
        fetch('http://localhost:3002/item/create', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <form onSubmit={() => { callSubmit() }}>
            <div>
                <label>name</label>
                <input type="text" onChange={(e) => { setNameValue(e.target.value) }} required/>
            </div>
            <div>
                <label>attributes</label>
                <div><input type="checkbox" onChange={(e) => { setattr1Value(e.target.value) }} value="attr1" /><label>attr1</label></div>
                <div><input type="checkbox" onChange={(e) => { setattr2Value(e.target.value) }} value="attr2" /><label>attr2</label></div>
            </div>
            <input type="submit" value="submit" />
        </form>
    )
}

export default UBSForm;