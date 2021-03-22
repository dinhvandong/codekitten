import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {injectIntl} from 'react-intl';

import LibraryItemComponent from '../components/library-item/library-item.jsx';

class LibraryItem extends React.PureComponent {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleBlur',
            'handleClick',
            'handleFocus',
            'handleKeyPress',
            'handleMouseEnter',
            'handleMouseLeave',
            'handlePlay',
            'handleStop',
            'rotateIcon',
            'startRotatingIcons',
            'stopRotatingIcons'
        ]);
        this.state = {
            iconIndex: 0,
            isRotatingIcon: false
        };
    }
    componentWillUnmount () {
        clearInterval(this.intervalId);
    }
    handleBlur (id) {
        this.handleMouseLeave(id);
    }
    handleClick (e) {
        if (!this.props.disabled) {
            this.props.onSelect(this.props.id);
            // console.log("this.props.bluetoothRequired:"+this.props.bluetoothRequired);
            // console.log("this.props.collaborator:"+this.props.collaborator);
            // console.log("this.props.description:"+tthis.props.description);
            // console.log("this.props.disabled:"+this.props.bluetoothRequired);
            // console.log("this.props.extensionId:"+this.props.bluetoothRequired);
            // console.log("this.props.featured:"+this.props.bluetoothRequired);
            // console.log("this.props.hidden:"+this.props.bluetoothRequired);
            // console.log("this.props.icons:"+this.props.icons);
            // console.log("this.props.id:"+this.props.id);
            // console.log("this.props.insetIconURL:"+this.props.insetIconURL);
            // console.log("this.props.internetConnectionRequired:"+this.props.internetConnectionRequired);
            // console.log("this.props.name:"+this.props.name);
            // console.log("this.props.showPlayButton:"+this.props.showPlayButton);
            let json = JSON.stringify(this.props.icons[0]);
            console.log("this.props.icons:"+ json);
            //this.props.insetIconURL
            console.log("this.props.insetIconURL:"+ this.props.insetIconURL);
        }
        e.preventDefault();
    }
    handleFocus (id) {
        if (!this.props.showPlayButton) {
            this.handleMouseEnter(id);
        }
    }
    handleKeyPress (e) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            this.props.onSelect(this.props.id);
            console.log("this.props.insetIconURL:"+ this.props.insetIconURL);
        }
    }
    componentDidUpdate()
    {

        // const iconMd5 = this.curIconMd5();
        // const iconURL = 
        // //"http://192.168.2.206:3000/api/tasks";
        //  iconMd5 ?
        //     `https://cdn.assets.scratch.mit.edu/internalapi/asset/${iconMd5}/get/` :
        //      this.props.iconRawURL;
            //  console.log("iconURL:"+ iconURL);
            //  console.log("iconMd5:"+ iconMd5);
            //  console.log("iconRawURL:"+ this.props.iconRawURL);
            // let json = JSON.stringify(this.props.icons[0]);
            //  console.log("this.props.icons:"+ json);
            //  //this.props.insetIconURL

           
    }
    handleMouseEnter () {
        // only show hover effects on the item if not showing a play button
        if (!this.props.showPlayButton) {
            this.props.onMouseEnter(this.props.id);
            if (this.props.icons && this.props.icons.length) {
                this.stopRotatingIcons();
                this.setState({
                    isRotatingIcon: true
                }, this.startRotatingIcons);
            }
        }
    }
    handleMouseLeave () {
        // only show hover effects on the item if not showing a play button
        if (!this.props.showPlayButton) {
            this.props.onMouseLeave(this.props.id);
            if (this.props.icons && this.props.icons.length) {
                this.setState({
                    isRotatingIcon: false
                }, this.stopRotatingIcons);
            }
        }
    }
    handlePlay () {
        this.props.onMouseEnter(this.props.id);
    }
    handleStop () {
        this.props.onMouseLeave(this.props.id);
    }
    startRotatingIcons () {
        this.rotateIcon();
        this.intervalId = setInterval(this.rotateIcon, 300);
    }
    stopRotatingIcons () {
        if (this.intervalId) {
            this.intervalId = clearInterval(this.intervalId);
        }
    }
    rotateIcon () {
        const nextIconIndex = (this.state.iconIndex + 1) % this.props.icons.length;
        this.setState({iconIndex: nextIconIndex});
    }
    curIconMd5 () {
        const iconMd5Prop = this.props.iconMd5;
        if (this.props.icons &&
            this.state.isRotatingIcon &&
            this.state.iconIndex < this.props.icons.length) {
            const icon = this.props.icons[this.state.iconIndex] || {};
            return icon.md5ext || // 3.0 library format
                icon.baseLayerMD5 || // 2.0 library format, TODO GH-5084
                iconMd5Prop;
        }
        return iconMd5Prop;
    }
    render () {
        const iconMd5 = this.curIconMd5();
        const iconURL = "http://192.168.2.206:3000/api/tasks";
       
        return (
            <LibraryItemComponent
                bluetoothRequired={this.props.bluetoothRequired}
                collaborator={this.props.collaborator}
                description={this.props.description}
                disabled={this.props.disabled}
                extensionId={this.props.extensionId}
                featured={this.props.featured}
                hidden={this.props.hidden}
                iconURL={iconURL}
                icons={this.props.icons}
                id={this.props.id}
                insetIconURL={iconURL}
                internetConnectionRequired={this.props.internetConnectionRequired}
                isPlaying={this.props.isPlaying}
                name={this.props.name}
                showPlayButton={this.props.showPlayButton}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                onKeyPress={this.handleKeyPress}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onPlay={this.handlePlay}
                onStop={this.handleStop}
            />
        );
    }
}

LibraryItem.propTypes = {
    bluetoothRequired: PropTypes.bool,
    collaborator: PropTypes.string,
    description: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    disabled: PropTypes.bool,
    extensionId: PropTypes.string,
    featured: PropTypes.bool,
    hidden: PropTypes.bool,
    iconMd5: PropTypes.string,
    iconRawURL: PropTypes.string,
    icons: PropTypes.arrayOf(
        PropTypes.shape({
            baseLayerMD5: PropTypes.string, // 2.0 library format, TODO GH-5084
            md5ext: PropTypes.string // 3.0 library format
        })
    ),
    id: PropTypes.number.isRequired,
    insetIconURL: PropTypes.string,
    internetConnectionRequired: PropTypes.bool,
    isPlaying: PropTypes.bool,
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ]),
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    showPlayButton: PropTypes.bool
};

export default injectIntl(LibraryItem);
