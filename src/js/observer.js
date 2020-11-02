function observe(observable, callback){
    var options = {
        threshold: 1.0
    }
    var intersectionObserver = new IntersectionObserver(function(entries, observer){
        var { target, intersectionRatio } = entries[0];

        if (intersectionRatio >= 0.95) {
            observer.unobserve(target);
            callback();
        }
    }, options);
    intersectionObserver.observe(observable);
}