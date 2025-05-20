<!-- Confirmation Prompt -->
<div class="alert confirm hidden" id="delete-confirm">
  <span class="material-icons">help_outline</span>
  <p>Are you sure you want to delete {something}?</p>
  <div class="alert-actions">
    <button class="btn btn-primary" id="confirm-yes">Yes</button>
    <button class="btn btn-secondary" id="confirm-no">No</button>
  </div>
</div>

<!-- Success Notification -->
<div class="alert success hidden" id="delete-success">
  <span class="material-icons">check_circle</span>
  <span>Deleted {something}.</span>
</div>

<!-- Error Notification -->
<div class="alert error hidden" id="delete-error">
  <span class="material-icons">error_outline</span>
  <span>Could not delete {something}.</span>
</div>