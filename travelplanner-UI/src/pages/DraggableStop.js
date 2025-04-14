import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Autocomplete } from '@react-google-maps/api';

const DraggableStop = ({ place, index, handlePlaceChange, autocompleteInputs, setAutocompleteInputs, moveStop, places }) => {
    const [, drag] = useDrag({
        type: 'stop',
        item: { index },
    });

    const [, drop] = useDrop({
        accept: 'stop',
        hover: (item) => {
            if (item.index !== index) {
                moveStop(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => drag(drop(node))} className="mb-3">
            <label htmlFor={`place${index}`} className="form-label">
                {index === 0 ? 'From' : index === places.length - 1 ? 'To' : `Stop ${index}`}
            </label>
            <Autocomplete
                onLoad={(ref) => (autocompleteInputs[index] = ref)}
                onPlaceChanged={() => handlePlaceChange(index, autocompleteInputs[index].getPlace().formatted_address)}
            >
                <input
                    type="text"
                    id={`place${index}`}
                    className="form-control"
                    value={place}
                    onChange={(e) => handlePlaceChange(index, e.target.value)}
                    placeholder={`Enter ${index === 0 ? 'from' : index === places.length - 1 ? 'destination' : 'stop'}`}
                />
            </Autocomplete>
        </div>
    );
};

export default DraggableStop;
