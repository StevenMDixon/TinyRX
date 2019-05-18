function mapDispatchToProps(functions, dispatch, props){
    return functions(dispatch, props);
}

export default mapDispatchToProps;