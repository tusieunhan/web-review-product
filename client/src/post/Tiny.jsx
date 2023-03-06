import React, { useEffect } from 'react';
import tinymce from 'tinymce';




const TinyMCE = ({ initialValue, onEditorChange }) => {
    useEffect(() => {
        tinymce.init({
            selector: '#editor',
        });

        return () => {
            tinymce.remove('#editor');
        };
    }, [onEditorChange]);

    useEffect(() => {
        tinymce.activeEditor.setContent(initialValue || '');
    }, [initialValue]);

    return (
        <textarea id="editor"></textarea>
    );
};

export default TinyMCE;