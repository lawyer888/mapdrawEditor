import mapLayers from './mapLayers';
class MouseEventListener {
    private map: any;
    private overlay: any;
    private feature: any;
    private textbox: any;
    private segline: any;
    constructor(map: any, overlay: any, feature: any, textbox: any, segline: any) {
        this.map = map;
        this.overlay = overlay;
        this.feature = feature;
        this.textbox = textbox;
        this.segline = segline;
    }
    mouseClickListener(callback: (mousePosition: any[]) => void, value: string): void {
        this.map.on(value, (event: any) => {
            let mousePosition = event.coordinate;
            callback(mousePosition);
        });
    }
    popupMenuListener(featureID: any, context?: any): any {
        if (context) {
            this.map.getViewport().removeEventListener('contextmenu', context);
        }
        else {
            let delete_obj = new mapLayers(this.map);
            let contextmenuListener = (event: any) => {
                event.preventDefault();
                const popup = document.createElement('div');
                popup.style.position = 'absolute';
                popup.style.left = event.clientX + 'px';
                popup.style.top = event.clientY + 'px';
                popup.style.background = '#fff';
                popup.style.color = 'black';
                popup.style.padding = '10px';
                popup.style.border = '1px solid #ccc';
                const deleteButton = document.createElement('button');
                deleteButton.textContent = '删除';
                deleteButton.style.display = 'block';
                deleteButton.style.marginBottom = '5px'; //下边距
                deleteButton.addEventListener('click', () => {
                    delete_obj.removeFromLayerById('vector', featureID)
                    this.deleteFeatureArr(featureID);
                    document.body.removeChild(popup);
                });
                popup.appendChild(deleteButton);
                const cancelButton = document.createElement('button');
                cancelButton.textContent = '取消';
                cancelButton.style.display = 'block';
                cancelButton.addEventListener('click', () => {
                    document.body.removeChild(popup);
                });
                popup.appendChild(cancelButton);
                document.body.appendChild(popup);
            }
            this.map.getViewport().addEventListener('contextmenu', contextmenuListener);
            return contextmenuListener;
        }
    }
    deleteFeatureArr(feature_id: any): void {
        if (feature_id.includes('overlay')) {
            let index = -1;
            this.overlay.forEach((item: any, i: number) => {
                if (item.options.id === feature_id) {
                    index = i;
                }
            });
            if (index !== -1) {
                this.overlay.splice(index, 1);
            }
        } else if (feature_id.includes('vecfeature')) {
            let index = -1;
            this.feature.forEach((item: any, i: number) => {
                if (item.options.id === feature_id) {
                    index = i;
                }
            });
            if (index !== -1) {
                this.feature.splice(index, 1);
            }
        }
        else if (feature_id.includes('textbox')) {
            let index = -1;
            this.textbox.forEach((item: any, i: number) => {
                if (item.options.id === feature_id) {
                    index = i;
                }
            });
            if (index !== -1) {
                this.textbox.splice(index, 1);
            }
        }
        else if (feature_id.includes('segline')) {
            let index = -1;
            this.segline.forEach((item: any, i: number) => {
                if (item.options.id === feature_id) {
                    index = i;
                }
            });
            if (index !== -1) {
                this.segline.splice(index, 1);
            }
        }
    }
}
export default MouseEventListener
