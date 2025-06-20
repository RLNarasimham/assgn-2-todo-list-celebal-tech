const styles = {
    container: {
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#00FCFC',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px',
    },
    input: {
        flex: 1,
        padding: '10px 14px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        transition: 'border-color 0.3s',
    },
    addButton: {
        padding: '10px 18px',
        alignSelf: 'flex-start',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    addButtonHover: {
        backgroundColor: '#FF2CD9',
    },
    controls: {
        display: 'flex',
        fontWeight:'bold',
        fontSize: '1.5rem',
        fontFamily: 'Lucida Sans',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    filterSelect: {
        padding: '8px 14px',
        fontSize: '16px',   
        fontWeight:'bold',
        borderRadius: '6px',
        border: '1px solid #28a745',
        backgroundColor: '#FE9EF9',
        color: '#000000',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
        appearance: 'none',
    },
    filterSelectHover: {
        backgroundColor: '#FFFDAF',
        color: '#1AA202',
        borderColor: '#0056b3',
    },
    sortSelect: {
        padding: '10px 16px',
        fontSize: '16px',
        fontWeight: 'bold',
        borderRadius: '8px',
        border: '1px solid #28a745',
        backgroundColor: '#FE9EF9',
        color: '#000000',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
        appearance: 'none',            
    },

    sortSelectHover: {
        backgroundColor: '#28a745',
        color: '#fff',
        borderColor: '#1e7e34',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '10px',
        backgroundColor: '#FFFFC3',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.05)',
    },
    taskText: {
        flex: 1,
        marginLeft: '10px',
        fontSize: '16px',
        color: '#333',
    },
    deleteButton: {
        padding: '6px 12px',
        borderRadius: '6px',
        border: 'none',
        backgroundColor: '#FF0303',
        color: '#fff',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    deleteButtonHover: {
        backgroundColor: '#CC0101',
    },
    visuallyHidden: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: 0,
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        border: 0,
    },
    errorText: {
        color: '#e63946',
        fontSize: '14px',
        marginTop: '5px',
    },
};

export default styles;