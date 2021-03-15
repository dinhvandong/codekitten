import classNames from 'classnames';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {defineMessages, injectIntl, intlShape} from 'react-intl';

import LibraryItem from '../../containers/library-item.jsx';
import Modal from '../../containers/modal.jsx';
import Divider from '../divider/divider.jsx';
import Filter from '../filter/filter.jsx';
import TagButton from '../../containers/tag-button.jsx';
import Spinner from '../spinner/spinner.jsx';
import styles from './library.css';

const messages = defineMessages({
    filterPlaceholder: {
        id: 'gui.library.filterPlaceholder',
        defaultMessage: 'Search',
        description: 'Placeholder text for library search field'
    },
    allTag: {
        id: 'gui.library.allTag',
        defaultMessage: 'All',
        description: 'Label for library tag to revert to all items after filtering by tag.'
    }
});

const ALL_TAG = {tag: 'all', intlLabel: messages.allTag};
const tagListPrefix = [ALL_TAG];

class LibraryComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleClose',
            'handleFilterChange',
            'handleFilterClear',
            'handleMouseEnter',
            'handleMouseLeave',
            'handlePlayingEnd',
            'handleSelect',
            'handleTagClick',
            'setFilteredDataRef'
        ]);
        this.state = {
            playingItem: null,
            filterQuery: '',
            selectedTag: ALL_TAG.tag,
            loaded: false ,       
            isLoaded: false,
            error: null,
            items: []
        };

        /**this.state = {
      error: null,
      isLoaded: false,
      items: []
    }; */
    }
    componentDidMount () {
        // Allow the spinner to display before loading the content
        console.log("componentDidMount");

            fetch("http://192.168.2.206:3000/api/library/getAll")
              .then(res => res.json())
              .then(
                (result) => {
                    console.log("componentDidMount_MacOS");     
                  this.setState({
                    isLoaded: true,
                    items: result.items
                  });
                  console.log(items);
                  console.table(items);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )
          


        setTimeout(() => {
            this.setState({loaded: true});
        });
        if (this.props.setStopHandler) this.props.setStopHandler(this.handlePlayingEnd);
    }
    componentDidUpdate (prevProps, prevState) {
        if (prevState.filterQuery !== this.state.filterQuery ||
            prevState.selectedTag !== this.state.selectedTag) 
        {
            this.scrollToTop();
        }
    }
    handleSelect (id) {
        this.handleClose();
        this.props.onItemSelected(this.getFilteredData()[id]);
    }
    handleClose () {
        this.props.onRequestClose();
    }
    handleTagClick (tag) {
        if (this.state.playingItem === null) {
            this.setState({
                filterQuery: '',
                selectedTag: tag.toLowerCase()
            });
        } else {
            this.props.onItemMouseLeave(this.getFilteredData()[[this.state.playingItem]]);
            this.setState({
                filterQuery: '',
                playingItem: null,
                selectedTag: tag.toLowerCase()
            });
        }
    }
    handleMouseEnter (id) {
        // don't restart if mouse over already playing item
        if (this.props.onItemMouseEnter && this.state.playingItem !== id) {
            this.props.onItemMouseEnter(this.getFilteredData()[id]);
            this.setState({
                playingItem: id
            });
        }
    }
    handleMouseLeave (id) {
        if (this.props.onItemMouseLeave) {
            this.props.onItemMouseLeave(this.getFilteredData()[id]);
            this.setState({
                playingItem: null
            });
        }
    }
    handlePlayingEnd () {
        if (this.state.playingItem !== null) {
            this.setState({
                playingItem: null
            });
        }
    }
    handleFilterChange (event) {
        if (this.state.playingItem === null) {
            this.setState({
                filterQuery: event.target.value,
                selectedTag: ALL_TAG.tag
            });
        } else {
            this.props.onItemMouseLeave(this.getFilteredData()[[this.state.playingItem]]);
            this.setState({
                filterQuery: event.target.value,
                playingItem: null,
                selectedTag: ALL_TAG.tag
            });
        }
    }
    handleFilterClear () {
        this.setState({filterQuery: ''});
    }
    getFilteredData () {
        console.log('I was triggered during render')

/*
bluetoothRequired={dataItem.bluetoothRequired}
                            collaborator={dataItem.collaborator}
                            description={dataItem.description}
                            disabled={dataItem.disabled}
                            extensionId={dataItem.extensionId}
                            featured={dataItem.featured}
                            hidden={dataItem.hidden}
                            iconRawURL= 'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png'
                            icons={'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png'}
                            id={index}
                            insetIconURL={'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png'}
                            internetConnectionRequired={dataItem.internetConnectionRequired}
                            isPlaying={this.state.playingItem === index}
                            key={typeof dataItem.name === 'string' ? dataItem.name : dataItem.rawURL}
                            name={'Animal'}
                            showPlayButton={this.props.showPlayButton}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            onSelect={this.handleSelect}
*/
        var arrayReturn = [

       {
        iconRawURL:'https://www.seekpng.com/png/full/906-9069165_fish-graphic-image-group-clip-art-royalty-free.png',
        name:'Animal',
        icons:'https://www.seekpng.com/png/full/906-9069165_fish-graphic-image-group-clip-art-royalty-free.png',
        insetIconURL:'https://www.seekpng.com/png/full/906-9069165_fish-graphic-image-group-clip-art-royalty-free.png',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false
       },
       {
        iconRawURL:'https://lh3.googleusercontent.com/proxy/R8s1MHEWp-nXj4vrDvWPoCziohkxRPwzy78nePgvy52O3ds4tUi3vmwzUNzDHsqas8zC_J84OcPxikK-M0vRW-PQLpJEjjwKS-TeGgKLu8WESAd2_EcWIk5eZTVq_xwikthqqHEnn69nQlVPZbZSAy4Vx8XnAxCpTCtKte6fiNSufn7BliCwpncC8LWLf9Vcmv16lSY7',
        name:'Animal',
        icons:'https://lh3.googleusercontent.com/proxy/R8s1MHEWp-nXj4vrDvWPoCziohkxRPwzy78nePgvy52O3ds4tUi3vmwzUNzDHsqas8zC_J84OcPxikK-M0vRW-PQLpJEjjwKS-TeGgKLu8WESAd2_EcWIk5eZTVq_xwikthqqHEnn69nQlVPZbZSAy4Vx8XnAxCpTCtKte6fiNSufn7BliCwpncC8LWLf9Vcmv16lSY7',
        insetIconURL:'https://lh3.googleusercontent.com/proxy/R8s1MHEWp-nXj4vrDvWPoCziohkxRPwzy78nePgvy52O3ds4tUi3vmwzUNzDHsqas8zC_J84OcPxikK-M0vRW-PQLpJEjjwKS-TeGgKLu8WESAd2_EcWIk5eZTVq_xwikthqqHEnn69nQlVPZbZSAy4Vx8XnAxCpTCtKte6fiNSufn7BliCwpncC8LWLf9Vcmv16lSY7',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false
       },
       {
        iconRawURL:'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png',
        name:'Animal',
        icons:'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png',
        insetIconURL:'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false
       },
       {
        iconRawURL:'https://www.pngkey.com/png/full/33-333939_ninja-cartoon-png-clipart-free-stock-ninja-clipart.png',
        name:'Animal',
        icons:'https://www.pngkey.com/png/full/33-333939_ninja-cartoon-png-clipart-free-stock-ninja-clipart.png',
        insetIconURL:'https://www.pngkey.com/png/full/33-333939_ninja-cartoon-png-clipart-free-stock-ninja-clipart.png',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false
       },
       {
        iconRawURL:'https://static.wixstatic.com/media/2cd43b_eaf19b29b96843988a21f47923b207fd~mv2.png/v1/fill/w_250,h_518,fp_0.50_0.50,q_95/2cd43b_eaf19b29b96843988a21f47923b207fd~mv2.png',
        name:'Animal',
        icons:'https://static.wixstatic.com/media/2cd43b_eaf19b29b96843988a21f47923b207fd~mv2.png/v1/fill/w_250,h_518,fp_0.50_0.50,q_95/2cd43b_eaf19b29b96843988a21f47923b207fd~mv2.png',
        insetIconURL:'https://static.wixstatic.com/media/2cd43b_eaf19b29b96843988a21f47923b207fd~mv2.png/v1/fill/w_250,h_518,fp_0.50_0.50,q_95/2cd43b_eaf19b29b96843988a21f47923b207fd~mv2.png',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false


       },
       {
        iconRawURL:'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png',
        name:'Animal',
        icons:'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png',
        insetIconURL:'https://freepngimg.com/thumb/animation/3-2-animation-png-picture.png',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false
       },
       {
        iconRawURL:'https://www.pngarts.com/files/8/Animation-PNG-High-Quality-Image.png',
        name:'Animal',
        icons:'https://www.pngarts.com/files/8/Animation-PNG-High-Quality-Image.png',
        insetIconURL:'https://www.pngarts.com/files/8/Animation-PNG-High-Quality-Image.png',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false
       },
       {
        iconRawURL:'https://cgfrog.com/wp-content/uploads/2014/04/Donald-Duck-Mickey-Mouse-DeviantArt-Donald-Duck-PNG.png',
        name:'Animal',
        icons:'https://cgfrog.com/wp-content/uploads/2014/04/Donald-Duck-Mickey-Mouse-DeviantArt-Donald-Duck-PNG.png',
        insetIconURL:'https://cgfrog.com/wp-content/uploads/2014/04/Donald-Duck-Mickey-Mouse-DeviantArt-Donald-Duck-PNG.png',
        collaborator:"collaborator",
        description:'description',
        extensionId:1,
        featured:'featured',
        key:'key',
        internetConnectionRequired:true,
        isPlaying:true,
        disabled:false
       }
    ];
        // if (this.state.selectedTag === 'all') {

        //     console.log(this.props.data);
        //     console.log(this.state.filterQuery);

        //     if (!this.state.filterQuery) return this.props.data;
        //     return this.props.data.filter(dataItem => (
        //         (dataItem.tags || [])
        //             // Second argument to map sets `this`
        //             .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
        //             .concat(dataItem.name ?
        //                 (typeof dataItem.name === 'string' ?
        //                 // Use the name if it is a string, else use formatMessage to get the translated name
        //                     dataItem.name : this.props.intl.formatMessage(dataItem.name.props)
        //                 ).toLowerCase() :
        //                 null)
        //             .join('\n') // unlikely to partially match newlines
        //             .indexOf(this.state.filterQuery.toLowerCase()) !== -1
        //     ));
        // }
        // return this.props.data.filter(dataItem => (
        //     dataItem.tags &&
        //     dataItem.tags
        //         .map(String.prototype.toLowerCase.call, String.prototype.toLowerCase)
        //         .indexOf(this.state.selectedTag) !== -1
        // ));
        console.log("componentDidMountAAAAA");



        //arrayReturn = items; 


        return arrayReturn;
    }
    scrollToTop () {
        this.filteredDataRef.scrollTop = 0;
    }
    setFilteredDataRef (ref) {
        this.filteredDataRef = ref;
    }
    render () {
        return (
            <Modal
                fullScreen
                contentLabel={this.props.title}
                id={this.props.id}
                onRequestClose={this.handleClose}
            >
                {(this.props.filterable || this.props.tags) && (
                    <div className={styles.filterBar}>
                        {this.props.filterable && (
                            <Filter
                                className={classNames(
                                    styles.filterBarItem,
                                    styles.filter
                                )}
                                filterQuery={this.state.filterQuery}
                                inputClassName={styles.filterInput}
                                placeholderText={this.props.intl.formatMessage(messages.filterPlaceholder)}
                                onChange={this.handleFilterChange}
                                onClear={this.handleFilterClear}
                            />
                        )}
                        {this.props.filterable && this.props.tags && (
                            <Divider className={classNames(styles.filterBarItem, styles.divider)} />
                        )}
                        {this.props.tags &&
                            <div className={styles.tagWrapper}>
                                {tagListPrefix.concat(this.props.tags).map((tagProps, id) => (
                                    <TagButton
                                        active={this.state.selectedTag === tagProps.tag.toLowerCase()}
                                        className={classNames(
                                            styles.filterBarItem,
                                            styles.tagButton,
                                            tagProps.className
                                        )}
                                        key={`tag-button-${id}`}
                                        onClick={this.handleTagClick}
                                        {...tagProps}
                                    />
                                ))}
                            </div>
                        }
                    </div>
                )}
                <div
                    className={classNames(styles.libraryScrollGrid, {
                        [styles.withFilterBar]: this.props.filterable || this.props.tags
                    })}
                    ref={this.setFilteredDataRef}
                >
                    {this.state.loaded ? this.getFilteredData().map((dataItem, index) => (
                        <LibraryItem
                            bluetoothRequired={dataItem.bluetoothRequired}
                            collaborator={dataItem.collaborator}
                            description={dataItem.description}
                            disabled={dataItem.disabled}
                            extensionId={dataItem.extensionId}
                            featured={dataItem.featured}
                            hidden={dataItem.hidden}
                            iconRawURL= {dataItem.iconRawURL}
                            icons={dataItem.icons}
                            id={index}
                            insetIconURL={dataItem.insetIconURL}
                           // internetConnectionRequired={dataItem.internetConnectionRequired}
                            isPlaying={this.state.playingItem === index}
                            key={typeof dataItem.name === 'string' ? dataItem.name : dataItem.rawURL}
                            name={'Animal'}
                            showPlayButton={this.props.showPlayButton}
                            onMouseEnter={this.handleMouseEnter}
                            onMouseLeave={this.handleMouseLeave}
                            onSelect={this.handleSelect}
                        />
                    )) : (
                        <div className={styles.spinnerWrapper}>
                            <Spinner
                                large
                                level="primary"
                            />
                        </div>
                    )}
                </div>
            </Modal>
        );
    }
}

LibraryComponent.propTypes = {
    data: PropTypes.arrayOf(
        /* eslint-disable react/no-unused-prop-types, lines-around-comment */
        // An item in the library
        PropTypes.shape({
            // @todo remove md5/rawURL prop from library, refactor to use storage
            md5: PropTypes.string,
            name: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.node
            ]),
            rawURL: PropTypes.string
        })
        /* eslint-enable react/no-unused-prop-types, lines-around-comment */
    ),
    filterable: PropTypes.bool,
    id: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func,
    onItemSelected: PropTypes.func,
    onRequestClose: PropTypes.func,
    setStopHandler: PropTypes.func,
    showPlayButton: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.shape(TagButton.propTypes)),
    title: PropTypes.string.isRequired
};

LibraryComponent.defaultProps = {
    filterable: true,
    showPlayButton: false
};

export default injectIntl(LibraryComponent);
