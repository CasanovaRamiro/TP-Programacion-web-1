document.getElementById("avanzarButton").addEventListener("click", function() {
    var selectedPlan = document.querySelector('input[name="opcion"]:checked');
    if (selectedPlan) {
        var planNombre = selectedPlan.value;
        // Redirige a la vista de pago y pasa el nombre del plan como parámetro
        window.location.href = "vistapagar.html?plan=" + encodeURIComponent(planNombre);
    } else {
        alert("Debes seleccionar un plan antes de avanzar.");
    }
});