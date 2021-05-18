Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

Array.prototype.removeIndex = function(index, deleteCount = 1) {
    this.splice(index, deleteCount);
};

Array.prototype.removeImagePath = function(uuid) {
    var index = -1
    for (var i = 0; i < this.length; i++) {
        if (this[i].uuid == uuid) {
            index = i
            break;
        }
    }
    if (index > -1) {
        this.splice(index, 1);
    }
};