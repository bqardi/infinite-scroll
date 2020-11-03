function observe(observable, callback){
    var intersectionObserver = new IntersectionObserver(function(entries, observer){
        var { target, intersectionRatio } = entries[0];

        if (intersectionRatio > 0) {
            observer.unobserve(target);
            callback();
        }
    });
    intersectionObserver.observe(observable);
}